import { all, fork, takeLatest, call, put, delay } from 'redux-saga/effects';
import {
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNUP_FINISH,
} from '../actions/userAction';
import { signUpApi, signInApi } from '../../api/userApi';
import moment from 'moment';

function* signIn(action) {
  const { memberId, password, isStayLogin } = action.data;
  try {
    const { data } = yield call(() => signInApi({ memberId, password }));
    const lastSignInTime = moment().format();
    const userData = { ...data, lastSignInTime };
    yield put({
      // put은 dispatch 동일
      type: SIGNIN_SUCCESS,
      data: { ...userData },
    });
    if (isStayLogin) {
      localStorage.setItem('USER', JSON.stringify(userData));
      localStorage.setItem('TOKEN', userData.jwt); // 로그인 성공시 로컬에 토큰저장
    } else {
      sessionStorage.setItem('USER', JSON.stringify(userData));
      sessionStorage.setItem('TOKEN', userData.jwt); // 로그인 성공시 로컬에 토큰저장
    }
  } catch (e) {
    // signupAPI 실패
    const { response: { data: { errorMessage = '' } = {} } = {} } = e;
    yield put({
      type: SIGNIN_FAILURE,
      error: errorMessage,
    });
  }
}

function* watchSignIn() {
  yield takeLatest(SIGNIN_REQUEST, signIn);
}

function* signUp(action) {
  try {
    const { data } = yield call(() => signUpApi(action.data));
    yield put({
      type: SIGNUP_SUCCESS,
    });
    yield put({
      // 가입과 동시에 로그인
      type: SIGNIN_SUCCESS,
      data: { ...data },
    });
    localStorage.setItem('USER', JSON.stringify(data));
    localStorage.setItem('TOKEN', data.jwt); // 로그인 성공시 로컬에 토큰저장
    yield put({
      type: SIGNUP_FINISH,
    });
  } catch (e) {
    const errorArray = [];
    const { response: { data: { errors = [] } = {} } = {} } = e;
    // signupAPI 실패
    if (errors.length > 0) {
      errors.forEach(object => object.errorMessage && errorArray.push(object.errorMessage));
    }
    console.log(errors);
    // 실패 문자열 넣어주기
    yield put({
      type: SIGNUP_FAILURE,
      error: errorArray.toString(),
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGNUP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchSignUp), fork(watchSignIn)]);
}
