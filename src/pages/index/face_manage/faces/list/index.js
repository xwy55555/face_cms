import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from './components/CTable';
import * as projectUtil from "../../../../../utils/rbacProjectUtil";

function RList({ dispatch, faceList }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = faceList;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch({
        type: 'faces/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onShowSizeChange(current, pageSize) {
      dispatch({
        type: 'faces/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onView(id) {
      dispatch({
        type: 'faces/gotoView',
        payload: id,
      });
    },
    onEdit(id) {
      dispatch({
        type: 'faces/gotoEdit',
        payload: id,
      });
    },
    onDelete(id) {
      dispatch({
        type: 'faceList/delete',
        payload: id,
      });
    },
    gotoChildList(id) {
      projectUtil.setCurMenuLink('/index/face_manage/members');
      dispatch({
        type: 'members/gotoList',
        payload: {face_id: id},
      });
    },
    onChangeOrderBy(record, flag) {
      dispatch({
        type: 'faceList/changeOrderBy',
        payload: {
          id: record.id,
          flag: flag,
        },
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'faces/select',
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
function mapStateToProps({ faceList }) {
  return { faceList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
