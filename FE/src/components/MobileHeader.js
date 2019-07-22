import React from 'react';
import '../styles/MobileHeader.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCoffee,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import propTypes from 'prop-types';
import tmonglogo from '../image/tmonglogo.png';
import { openPopup } from '../utils/popup';


const MobileHeader = ({
  isLogined = false, isAdmin = false, user, loginRef, setIsList = null, isList = false,
}) => (
  <>
    <div className="header_mobile-wrap">
      <div className="header_mobile-logo">
        <img src={tmonglogo} alt="logo" />
        {isAdmin ? <Link to="/admin/order-manage" /> : <Link to="/" />}
      </div>
      <div className="header_mobile-column">
        {isAdmin ? (
          <>
            <Link to="/admin/order-manage">주문현황</Link>
            <Link to="/admin/menu-manage">메뉴관리</Link>
            <Link to="/admin/order-history">주문히스토리</Link>
            <Link to="/admin/member-manage">사용자관리</Link>
          </>
        ) : (
          <>
            <Link to="/user-info">
              <FontAwesomeIcon icon={faUser} size="2x" />
            </Link>
            <Link to="/myorder">
              <FontAwesomeIcon icon={faCoffee} size="2x" />
            </Link>
            <button
              type="button"
              className="mobile-list"
              onClick={() => {
                setIsList(!isList);
              }}
            >
              <FontAwesomeIcon icon={faBars} size="2x" />
            </button>
          </>
        )}
      </div>
      <div
        className={isList ? 'header_mobile-list' : 'header_mobile-list-none'}
      >
        <div className="list-cover" />
        <button
          type="button"
          className="list-button"
          onClick={() => {
            setIsList(prev => !prev);
          }}
        >
          <FontAwesomeIcon icon={faTimes} size="1.3x" />
        </button>
        <Link to="/">
          <div
            onClick={() => {
              setIsList(prev => !prev);
            }}
          >
              Menu
          </div>
        </Link>
        <Link to="/myorder">
          <div
            onClick={() => {
              setIsList(prev => !prev);
            }}
          >
              MyOrder
          </div>
        </Link>
        <Link to="/user-info">
          <div
            onClick={() => {
              setIsList(prev => !prev);
            }}
          >
              MyPage
          </div>
        </Link>
        <Link to="/cart">
          <div
            onClick={() => {
              setIsList(prev => !prev);
            }}
          >
              Cart
          </div>
        </Link>
        <div
          className="sign_link"
          onClick={() => {
            setIsList(prev => !prev);
          }}
        >
          {isLogined ? (
            <Link to="/logout">LogOut</Link>
          ) : (
            <>
              <a><div onClick={() => openPopup(loginRef.current)}>SignIn</div></a>
              <Link to="/signup">SignUp</Link>
            </>
          )}
        </div>
      </div>
    </div>
  </>
);

MobileHeader.propTypes = {
  isLogined: propTypes.bool,
  isAdmin: propTypes.bool,
  user: propTypes.object,
  loginRef: propTypes.objectOf(propTypes.instanceOf(Element)),
  setIsList: propTypes.func,
  isList: propTypes.bool,

};

export default MobileHeader;
