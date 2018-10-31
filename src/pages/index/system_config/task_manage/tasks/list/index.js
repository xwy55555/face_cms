import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from './components/CTable';
import * as projectUtil from "../../../../../../utils/rbacProjectUtil";

function RList({ dispatch, taskList }) {
  const { loading, dataSource, total, pageSize, current, conditionName, beginDT, endDT, } = taskList;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch({
        type: 'tasks/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName, begin_dt:beginDT, end_dt:endDT },
      });
    },
    onShowSizeChange(current, pageSize) {
      dispatch({
        type: 'tasks/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName, begin_dt:beginDT, end_dt:endDT },
      });
    },
    onEnabled(id) {
      dispatch({
        type: 'taskEdit/edit',
        payload: {id, status:'enabled'},
      });
    },
    onDisabled(id) {
      dispatch({
        type: 'taskEdit/edit',
        payload: {id, status:'disabled'},
      });
    },
    onView(id) {
      dispatch({
        type: 'tasks/gotoView',
        payload: id,
      });
    },
    onEdit(id) {
      dispatch({
        type: 'tasks/gotoEdit',
        payload: id,
      });
    },
    onDelete(id) {
      dispatch({
        type: 'taskList/delete',
        payload: id,
      });
    },
    onAuth(item) {
      dispatch({
        type: 'tasks/gotoAuth',
        payload: {id: item.id, name: item.name, role_ids: item.role_ids }
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'tasks/select',
        payload: selectedRowKeys,
      });
    },
    gotoChildList(id) {
      projectUtil.setCurMenuLink('/index/system_config/task_manage/task_logs');
      dispatch({
        type: 'mobileAppConfigs/gotoList',
        payload: {task_id: id},
      });
    },
  };
  return (
    <CTable {...tableProps}/>
  );
}

RList.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ taskList }) {
  return { taskList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
