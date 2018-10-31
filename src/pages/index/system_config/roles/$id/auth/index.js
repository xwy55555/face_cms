import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { message } from 'antd';
import CAuth from './components/CAuth';

function RAuth({ dispatch, roleAuth }) {
  const { curRecord, menuTreeDataSource, selectedMenuIds, expandedMenuIds, autoExpandParent, searchValue, } = roleAuth;

  const authProps = {
    item: curRecord,
    checkedKeys: selectedMenuIds,
    expandedKeys: expandedMenuIds,
    autoExpandParent,
    searchValue,
    dataSource: menuTreeDataSource,
    onSave() {
      if (selectedMenuIds === undefined || selectedMenuIds === null || selectedMenuIds.length === 0) {
        message.info('请至少选中一个菜单');
      } else {
        dispatch({
          type: 'roleAuth/edit',
          payload: { id: curRecord.id, menu_ids: selectedMenuIds.toString() },
        });
      }
    },
    onCancel() {
      dispatch({
        type: 'roles/gotoList',
      });
    },
    onCheck(info) {
      dispatch({
        type: 'roleAuth/selectMenus',
        payload: info,
      });
    },
    onExpand(expandedKeys) {
      dispatch({
        type: 'roleAuth/setValue',
        payload: {expandedMenuIds: expandedKeys, autoExpandParent: false},
      });
    },
    onChange(expandedKeys, searchValue, autoExpandParent) {
      dispatch({
        type: 'roles/setValue',
        payload: {expandedMenuIds: expandedKeys, searchValue, autoExpandParent},
      });
    },
  };
  return (
    <CAuth {...authProps} />
  );
}

RAuth.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ roleAuth }) {
  return { roleAuth };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAuth);
