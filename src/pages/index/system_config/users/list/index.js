import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from './components/CTable';

function RList({ dispatch, userList }) {
  const { loading, dataSource, total, pageSize, current, conditionName, conditionAccount, conditionMobile, conditionCode } = userList;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch({
        type: 'users/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName, account:conditionAccount, mobile:conditionMobile, code:conditionCode },
      });
    },
    onShowSizeChange(current, pageSize) {
      dispatch({
        type: 'users/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName, account:conditionAccount, mobile:conditionMobile, code:conditionCode },
      });
    },
    onView(id) {
      dispatch({
        type: 'users/gotoView',
        payload: id,
      });
    },
    onEdit(id) {
      dispatch({
        type: 'users/gotoEdit',
        payload: id,
      });
    },
    onDelete(id) {
      dispatch({
        type: 'userList/delete',
        payload: id,
      });
    },
    onAuth(item) {
      dispatch({
        type: 'users/gotoAuth',
        payload: {id: item.id, name: item.name, role_ids: item.role_ids }
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'users/select',
        payload: selectedRowKeys,
      });
    }
  };
  return (
    <CTable {...tableProps}/>
  );
}

RList.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ userList }) {
  return { userList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
