import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from './components/CTable';

function RList({ dispatch, dictBankList }) {
  const { loading, dataSource, total, pageSize, current, conditionName, conditionCode } = dictBankList;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch({
        type: 'dictBanks/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName, code:conditionCode },
      });
    },
    onShowSizeChange(current, pageSize) {
      dispatch({
        type: 'dictBanks/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName, code:conditionCode },
      });
    },
    onEnabled(id) {
      dispatch({
        type: 'dictBankEdit/edit',
        payload: {id, status:'enabled'},
      });
    },
    onDisabled(id) {
      dispatch({
        type: 'dictBankEdit/edit',
        payload: {id, status:'disabled'},
      });
    },
    onView(id) {
      dispatch({
        type: 'dictBanks/gotoView',
        payload: id,
      });
    },
    onEdit(id) {
      dispatch({
        type: 'dictBanks/gotoEdit',
        payload: id,
      });
    },
    onDelete(id) {
      dispatch({
        type: 'dictBankList/delete',
        payload: id,
      });
    },
    onAuth(item) {
      dispatch({
        type: 'dictBanks/gotoAuth',
        payload: {id: item.id, name: item.name, role_ids: item.role_ids }
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'dictBanks/select',
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
function mapStateToProps({ dictBankList }) {
  return { dictBankList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
