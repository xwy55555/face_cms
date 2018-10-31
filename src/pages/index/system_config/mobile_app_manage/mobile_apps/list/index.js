import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from './components/CTable';
import * as projectUtil from "../../../../../../utils/rbacProjectUtil";

function RList({ dispatch, mobileAppList }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = mobileAppList;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch({
        type: 'mobileApps/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onShowSizeChange(current, pageSize) {
      dispatch({
        type: 'mobileApps/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onView(id) {
      dispatch({
        type: 'mobileApps/gotoView',
        payload: id,
      });
    },
    onEdit(id) {
      dispatch({
        type: 'mobileApps/gotoEdit',
        payload: id,
      });
    },
    onDelete(id) {
      dispatch({
        type: 'mobileAppList/delete',
        payload: id,
      });
    },
    gotoChildList(id) {
      projectUtil.setCurMenuLink('/index/system_config/mobile_app_manage/mobile_app_configs');
      dispatch({
        type: 'mobileAppConfigs/gotoList',
        payload: {mobile_app_id: id},
      });
    },
    onChangeOrderBy(record, flag) {
      dispatch({
        type: 'mobileAppList/changeOrderBy',
        payload: {
          id: record.id,
          flag: flag,
        },
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'mobileApps/select',
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
function mapStateToProps({ mobileAppList }) {
  return { mobileAppList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
