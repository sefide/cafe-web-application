import React, { useState } from 'react';
import axios from 'axios';

const url = 'http://localhost:3000/';

const SignIn = () => {
  const [inputId, setInputID] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [resultId, setResultId] = useState('');
  const getResultId = (id, pw, address) => axios
      .post(address, {
        id,
        pw,
      })
      .then(res => res.id)
      .catch(err => console.log('로그인 실패', err));

  return (
    <>
      <h1>로그인</h1>
      <div>
        {resultId !== ''
          && typeof resultId === 'string'
          && `${resultId}님 환영합니다`}
      </div>
      <input type="text" onChange={() => setInputID(inputId)} />
      <input type="password" onChange={() => setInputPw(inputPw)} />
      <input
        type="button"
        value="login"
        onClick={() => setResultId(getResultId(inputId, inputPw, url))}
      />
    </>
  );
};

export default SignIn;
