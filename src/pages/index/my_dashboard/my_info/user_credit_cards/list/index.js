import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from './components/CTable';

function RList({ dispatch, userCreditCards }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = userCreditCards;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch({
        type: 'userCreditCards/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onShowSizeChange(current, pageSize) {
      dispatch({
        type: 'userCreditCards/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onView(id) {
      dispatch({
        type: 'userCreditCards/gotoView',
        payload: id,
      });
    },
    onEdit(id) {
      dispatch({
        type: 'userCreditCards/gotoEdit',
        payload: id,
      });
    },
    onDelete(id) {
      dispatch({
        type: 'userCreditCardList/delete',
        payload: id,
      });
    },
    onAuth(item) {
      dispatch({
        type: 'userCreditCards/gotoAuth',
        payload: {id: item.id, name: item.name, role_ids: item.role_ids }
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'userCreditCards/select',
        payload: selectedRowKeys,
      });
    }
  };
  return (
    <CTable {...tableProps}/>
  );
}

RList.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ userCreditCards }) {
  return { userCreditCards };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
