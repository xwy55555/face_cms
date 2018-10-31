import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from './components/CTable';

function RList({ dispatch, roleList }) {
  const { loading, dataSource, total, pageSize, current, conditionName, conditionCode } = roleList;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch({
        type: 'roles/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName, code:conditionCode },
      });
    },
    onShowSizeChange(current, pageSize) {
      dispatch({
        type: 'roles/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName, code:conditionCode },
      });
    },
    onView(id) {
      dispatch({
        type: 'roles/gotoView',
        payload: id,
      });
    },
    onEdit(id) {
      dispatch({
        type: 'roles/gotoEdit',
        payload: id,
      });
    },
    onDelete(id) {
      dispatch({
        type: 'roleList/delete',
        payload: id,
      });
    },
    onAuth(item) {
      dispatch({
        type: 'roles/gotoAuth',
        payload: {id: item.id, name:item.name, menu_ids: item.menu_ids }
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'roles/select',
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
function mapStateToProps({ roleList }) {
  return { roleList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
