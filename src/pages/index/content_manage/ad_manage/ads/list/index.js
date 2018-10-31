import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from './components/CTable';

function RList({ dispatch, ads }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = ads;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch({
        type: 'ads/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onShowSizeChange(current, pageSize) {
      dispatch({
        type: 'ads/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onView(id) {
      dispatch({
        type: 'ads/gotoView',
        payload: id,
      });
    },
    onEdit(id) {
      dispatch({
        type: 'ads/gotoEdit',
        payload: id,
      });
    },
    onEnabled(id) {
      dispatch({
        type: 'adEdit/edit',
        payload: {id, status:'enabled'},
      });
    },
    onDisabled(id) {
      dispatch({
        type: 'adEdit/edit',
        payload: {id, status:'disabled'},
      });
    },
    onDelete(id) {
      dispatch({
        type: 'adList/delete',
        payload: id,
      });
    },
    onChangeOrderBy(record, flag) {
      dispatch({
        type: 'adList/changeOrderBy',
        payload: {
          id: record.id,
          flag: flag,
        },
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'ads/select',
        payload: selectedRowKeys,
      });
    }
  };
  return (
    <CTable {...tableProps}/>
  );
}

RList.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ ads }) {
  return { ads };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
