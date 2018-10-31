import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from './components/CTable';
import * as projectUtil from "../../../../../utils/rbacProjectUtil";

function RList({ dispatch, levelList }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = levelList;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch({
        type: 'levels/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onShowSizeChange(current, pageSize) {
      dispatch({
        type: 'levels/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onView(id) {
      dispatch({
        type: 'levels/gotoView',
        payload: id,
      });
    },
    onEdit(id) {
      dispatch({
        type: 'levels/gotoEdit',
        payload: id,
      });
    },
    onDelete(id) {
      dispatch({
        type: 'levelList/delete',
        payload: id,
      });
    },
    gotoChildList(id) {
      projectUtil.setCurMenuLink('/index/member_manage/members');
      dispatch({
        type: 'members/gotoList',
        payload: {level_id: id},
      });
    },
    onChangeOrderBy(record, flag) {
      dispatch({
        type: 'levelList/changeOrderBy',
        payload: {
          id: record.id,
          flag: flag,
        },
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'levels/select',
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
function mapStateToProps({ levelList }) {
  return { levelList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
