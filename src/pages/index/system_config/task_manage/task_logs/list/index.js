import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from './components/CTable';

function RList({ dispatch, taskLogList }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = taskLogList;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch({
        type: 'taskLogs/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onShowSizeChange(current, pageSize) {
      dispatch({
        type: 'taskLogs/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onView(id) {
      dispatch({
        type: 'taskLogs/gotoView',
        payload: id,
      });
    },
    onEdit(id) {
      dispatch({
        type: 'taskLogs/gotoEdit',
        payload: id,
      });
    },
    onDelete(id) {
      dispatch({
        type: 'taskLogList/delete',
        payload: id,
      });
    },
    onAuth(item) {
      dispatch({
        type: 'taskLogs/gotoAuth',
        payload: {id: item.id, name: item.name, role_ids: item.role_ids }
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'taskLogs/select',
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
function mapStateToProps({ taskLogList }) {
  return { taskLogList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
