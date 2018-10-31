import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from './components/CTable';

function RList({ location, dispatch, dictList }) {
  const { loading, dataSource, total, pageSize, current, conditionName, curTypeId } = dictList;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch({
        type: 'dicts/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName, type_id: curTypeId },
      });
    },
    onShowSizeChange(current, pageSize) {
      dispatch({
        type: 'dicts/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName, type_id: curTypeId },
      });
    },
    onView(id) {
      dispatch({
        type: 'dicts/gotoView',
        payload: id,
      });
    },
    onEdit(id) {
      dispatch({
        type: 'dicts/gotoEdit',
        payload: id,
      });
    },
    onDelete(id) {
      dispatch({
        type: 'dictList/delete',
        payload: id,
      });
    },
    onChangeOrderBy(record, flag) {
      dispatch({
        type: 'dictList/changeOrderBy',
        payload: {
          id: record.id,
          flag: flag,
        },
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'dicts/select',
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
function mapStateToProps({ dictList }) {
  return { dictList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
