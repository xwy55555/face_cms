import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from './components/CTable';
import * as projectUtil from "../../../../../../utils/rbacProjectUtil";

function RList({ dispatch, adPositionList }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = adPositionList;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch({
        type: 'adPositions/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onShowSizeChange(current, pageSize) {
      dispatch({
        type: 'adPositions/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onEnabled(id) {
      dispatch({
        type: 'adPositionEdit/edit',
        payload: {id, status:'enabled'},
      });
    },
    onDisabled(id) {
      dispatch({
        type: 'adPositionEdit/edit',
        payload: {id, status:'disabled'},
      });
    },
    onView(id) {
      dispatch({
        type: 'adPositions/gotoView',
        payload: id,
      });
    },
    onEdit(id) {
      dispatch({
        type: 'adPositions/gotoEdit',
        payload: id,
      });
    },
    onDelete(id) {
      dispatch({
        type: 'adPositionList/delete',
        payload: id,
      });
    },
    onAuth(item) {
      dispatch({
        type: 'adPositions/gotoAuth',
        payload: {id: item.id, name: item.name, role_ids: item.role_ids }
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'adPositions/select',
        payload: selectedRowKeys,
      });
    },
    gotoChildList(id) {
      projectUtil.setCurMenuLink('/index/content_manage/ad_manage/ads');
      dispatch({
        type: 'ads/gotoList',
        payload: {ad_position_id: id},
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
function mapStateToProps({ adPositionList }) {
  return { adPositionList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
