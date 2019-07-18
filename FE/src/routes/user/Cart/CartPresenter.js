import React from 'react';
import propTypes from 'prop-types';
import CartForm from '../../../components/CartForm';
import '../../../styles/CartPresenter.scss';

const CartPresenter = ({ handleCart, handleCheckedCart }) => {
  return (
    <div className="cart-wrapper">
      <div className="cart-title">장바구니</div>
      <div className="cart-container">
        <CartForm
          handleCart={handleCart}
          handleCheckedCart={handleCheckedCart}
        />
      </div>
    </div>
  );
};

CartPresenter.propTypes = {};

export default CartPresenter;
