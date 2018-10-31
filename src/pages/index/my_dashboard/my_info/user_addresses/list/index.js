import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from './components/CTable';

function RList({ location, dispatch, userAddressList }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = userAddressList;

  const tableProps = {
    dataSource,
    loading,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch({
        type: 'userAddresses/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onShowSizeChange(current, pageSize) {
      dispatch({
        type: 'userAddresses/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onView(id) {
      dispatch({
        type: 'userAddresses/gotoView',
        payload: id,
      });
    },
    onEdit(id) {
      dispatch({
        type: 'userAddresses/gotoEdit',
        payload: id,
      });
    },
    onDelete(id) {
      dispatch({
        type: 'userAddressList/delete',
        payload: id,
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'userAddresses/select',
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
function mapStateToProps({ userAddressList }) {
  return { userAddressList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
