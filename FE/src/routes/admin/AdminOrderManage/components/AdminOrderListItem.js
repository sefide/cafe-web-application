import React, { useCallback, useMemo, useRef, useState } from 'react';
import propTypes from 'prop-types';
import '../styles/AdminOrderListItem.scss';

const AdminOrderListItem = ({ list, socketSetOrderState }) => {
  const { order_id, menus, made, paid, createdDate, amount, member_id } = list;
  const orderCard = useRef(null);
  let timer;

  const cardEffect = (element, effect) => {
    element.classList.add(effect);
    setTimeout(() => {
      element.classList.remove(effect);
    }, 1000);
  };

  // state 변경 callback
  const handleChangeState = useCallback(
    (list, state, graphicEffect) => {
      const controlChange = async () => {
        if (!timer) {
          if (!timer && graphicEffect) {
            await graphicEffect();
          }
          timer = await setTimeout(async () => {
            timer = null;
            socketSetOrderState(list, state);
          }, 1000);
        }
      };
      controlChange();
    },
    [socketSetOrderState],
  );

  // 메뉴 아이콘 ui
  const alignMenus = menus.map((item, index) => {
    const result = <li key={index}>{item}</li>;
    return result;
  }, '');

  // 메뉴 버튼 조건렌더
  const memoMakeBtn = useMemo(() => {
    return made ? (
      <></>
    ) : (
      <input
        type="button"
        value="→"
        onClick={() => {
          handleChangeState(list, { made: true }, () => cardEffect(orderCard.current, 'ghost'));
        }}
        className="madeBtn"
      />
    );
  }, [made, list, handleChangeState]);

  // 결제버튼 조건렌더
  const memoPaidBtn = useMemo(() => {
    return paid ? (
      <div className="paid">결제완료</div>
    ) : (
      <>
        <div className="non-paid">{`결제금액: ${amount} 원`}</div>
        <input
          className="payBtn"
          type="button"
          value="결제하기"
          onClick={() =>
            handleChangeState(list, { paid: true }, () => cardEffect(orderCard.current, 'blink'))
          }
        />
      </>
    );
  }, [amount, paid, list, handleChangeState]);

  // 픽업버튼 조건렌더
  const memoPickupBtn = useMemo(() => {
    return made && paid ? (
      <input
        className="pickupBtn"
        type="button"
        value="PickUp"
        onClick={() =>
          handleChangeState(list, { pickup: true }, () => cardEffect(orderCard.current, 'fly'))
        }
      />
    ) : (
      <></>
    );
  }, [made, paid, list, handleChangeState]);

  return (
    <div className="AdminOrderListItem" ref={orderCard}>
      {memoMakeBtn}
      <div className="orderNum">{`주문번호. ${order_id}`}</div>
      <div className="member_id">{`ID:  ${member_id}`}</div>
      <ul>{alignMenus}</ul>
      <div className="payArea">{memoPaidBtn}</div>
      {memoPickupBtn}
      <div className="createdDate">{createdDate}</div>
    </div>
  );
};

AdminOrderListItem.defaultProps = {
  list: [],
  socketSetOrderState: () => {},
};

AdminOrderListItem.propTypes = {
  list: propTypes.objectOf(
    propTypes.oneOfType([propTypes.number, propTypes.string, propTypes.array, propTypes.bool]),
  ),
  socketSetOrderState: propTypes.func,
};

export default AdminOrderListItem;