import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from './components/CTable';

function RList({ dispatch, resourceList }) {
  const { loading, dataSource, total, pageSize, current, beginDT, endDT } = resourceList;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch({
        type: 'resources/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, begin_dt:beginDT, end_dt:endDT },
      });
    },
    onShowSizeChange(current, pageSize) {
      dispatch({
        type: 'resources/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, begin_dt:beginDT, end_dt:endDT },
      });
    },
    onView(id) {
      dispatch({
        type: 'resources/gotoView',
        payload: id,
      });
    },
    onEdit(id) {
      dispatch({
        type: 'resources/gotoEdit',
        payload: id,
      });
    },
    onDelete(id) {
      dispatch({
        type: 'resourceList/delete',
        payload: id,
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'resources/select',
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
function mapStateToProps({ resourceList }) {
  return { resourceList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
