import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from './components/CTable';
import * as projectUtil from "../../../../../../utils/rbacProjectUtil";

function RList({ dispatch, carouselList }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = carouselList;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch({
        type: 'carousels/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onShowSizeChange(current, pageSize) {
      dispatch({
        type: 'carousels/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onEnabled(id) {
      dispatch({
        type: 'carouselEdit/edit',
        payload: {id, status:'enabled'},
      });
    },
    onDisabled(id) {
      dispatch({
        type: 'carouselEdit/edit',
        payload: {id, status:'disabled'},
      });
    },
    onView(id) {
      dispatch({
        type: 'carousels/gotoView',
        payload: id,
      });
    },
    onEdit(id) {
      dispatch({
        type: 'carousels/gotoEdit',
        payload: id,
      });
    },
    onDelete(id) {
      dispatch({
        type: 'carouselList/delete',
        payload: id,
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'carousels/select',
        payload: selectedRowKeys,
      });
    },
    gotoChildList(id) {
      projectUtil.setCurMenuLink('/index/content_manage/carousel_manage/carousel_items');
      dispatch({
        type: 'carouselItems/gotoList',
        payload: {carousel_id: id},
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
function mapStateToProps({ carouselList }) {
  return { carouselList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
