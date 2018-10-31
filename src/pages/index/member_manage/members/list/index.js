import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from './components/CTable';

function RList({ location, dispatch, memberList }) {
  const { loading, dataSource, total, pageSize, current, conditionName, curLevelID } = memberList;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch({
        type: 'members/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName, level_id: curLevelID },
      });
    },
    onShowSizeChange(current, pageSize) {
      dispatch({
        type: 'members/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName, level_id: curLevelID },
      });
    },
    onView(id) {
      dispatch({
        type: 'members/gotoView',
        payload: id,
      });
    },
    onEdit(id) {
      dispatch({
        type: 'members/gotoEdit',
        payload: id,
      });
    },
    onDelete(id) {
      dispatch({
        type: 'memberList/delete',
        payload: id,
      });
    },
    onChangeOrderBy(record, flag) {
      dispatch({
        type: 'memberList/changeOrderBy',
        payload: {
          id: record.id,
          flag: flag,
        },
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'members/select',
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
function mapStateToProps({ memberList }) {
  return { memberList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
