import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from './components/CTable';

function RList({ dispatch, mobileAppConfigList }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = mobileAppConfigList;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch({
        type: 'mobileAppConfigs/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onShowSizeChange(current, pageSize) {
      dispatch({
        type: 'mobileAppConfigs/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onEnabled(id) {
      dispatch({
        type: 'mobileAppConfigEdit/edit',
        payload: {id, status:'enabled'},
      });
    },
    onDisabled(id) {
      dispatch({
        type: 'mobileAppConfigEdit/edit',
        payload: {id, status:'disabled'},
      });
    },
    onView(id) {
      dispatch({
        type: 'mobileAppConfigs/gotoView',
        payload: id,
      });
    },
    onEdit(id) {
      dispatch({
        type: 'mobileAppConfigs/gotoEdit',
        payload: id,
      });
    },
    onDelete(id) {
      dispatch({
        type: 'mobileAppConfigList/delete',
        payload: id,
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'mobileAppConfigs/select',
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
function mapStateToProps({ mobileAppConfigList }) {
  return { mobileAppConfigList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
