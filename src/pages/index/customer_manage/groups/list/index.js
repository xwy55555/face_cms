import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from './components/CTable';
import * as projectUtil from "../../../../../utils/rbacProjectUtil";

function RList({ dispatch, groupList }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = groupList;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch({
        type: 'groups/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onShowSizeChange(current, pageSize) {
      dispatch({
        type: 'groups/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onView(id) {
      dispatch({
        type: 'groups/gotoView',
        payload: id,
      });
    },
    onEdit(id) {
      dispatch({
        type: 'groups/gotoEdit',
        payload: id,
      });
    },
    onDelete(id) {
      dispatch({
        type: 'groups/delete',
        payload: id,
      });
    },
    gotoChildList(id) {
      projectUtil.setCurMenuLink('/index/customer_manage/customers');
      dispatch({
        type: 'customers/gotoList',
        payload: {group_id: id},
      });
    },
    onChangeOrderBy(record, flag) {
      dispatch({
        type: 'groups/changeOrderBy',
        payload: {
          id: record.id,
          flag: flag,
        },
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'groups/select',
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
function mapStateToProps({ groupList }) {
  return { groupList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
