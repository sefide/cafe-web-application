import React from 'react';
import propTypes from 'prop-types';
import AdminOrderListItem from './AdminOrderListItem';
import '../styles/AdminMakingArea.scss';

const AdminMakingArea = ({ list, areaName, socketSetOrderState, setIsBlock }) => {
  const title = areaName === 'before' ? '제작중' : '제작완료';
  const mapListItem = list.map((item, index) => {
    const keyOfItem = index;
    return (
      <AdminOrderListItem
        key={keyOfItem}
        list={item}
        socketSetOrderState={socketSetOrderState}
        setIsBlock={setIsBlock}
      />
    );
  });

  return (
    <div className={`${areaName}Making-area`}>
      <h2>{title}</h2>
      <div className="orderBoard">
        <div className="orderLists">{mapListItem}</div>
      </div>
    </div>
  );
};

AdminMakingArea.defaultProps = {
  list: [],
  areaName: 'before',
  setCurrentOrderList: () => {},
  setIsBlock: () => {},
};

AdminMakingArea.propTypes = {
  list: propTypes.arrayOf(propTypes.object),
  areaName: propTypes.string,
  setCurrentOrderList: propTypes.func,
  setIsBlock: propTypes.func,
};

export default AdminMakingArea;
