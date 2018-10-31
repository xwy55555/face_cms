import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from './components/CTable';

function RList({ dispatch, customerList }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = customerList;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch({
        type: 'customers/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onShowSizeChange(current, pageSize) {
      dispatch({
        type: 'customers/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onEnabled(id) {
      dispatch({
        type: 'customerEdit/edit',
        payload: {id, status:'enabled'},
      });
    },
    onDisabled(id) {
      dispatch({
        type: 'customerEdit/edit',
        payload: {id, status:'disabled'},
      });
    },
    onView(id) {
      dispatch({
        type: 'customers/gotoView',
        payload: id,
      });
    },
    onEdit(id) {
      dispatch({
        type: 'customers/gotoEdit',
        payload: id,
      });
    },
    onDelete(id) {
      dispatch({
        type: 'customers/delete',
        payload: id,
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'customers/select',
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
function mapStateToProps({ customerList }) {
  return { customerList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
