import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { message } from 'antd';
import CAuth from './components/CAuth';

function RAuth({ dispatch, userAuth }) {
  const { curRecord, roleTreeDataSource, selectedRoleIds, expandedRoleIds, autoExpandParent, searchValue, } = userAuth;
  const authProps = {
    item: curRecord,
    checkedKeys: selectedRoleIds,
    expandedKeys: expandedRoleIds,
    autoExpandParent,
    searchValue,
    dataSource: roleTreeDataSource,
    onSave() {
      if (selectedRoleIds === undefined || selectedRoleIds === null || selectedRoleIds.length === 0) {
        message.info('请至少选中一个角色');
      } else {
        dispatch({
          type: 'userEdit/edit',
          payload: { id: curRecord.id, role_ids: selectedRoleIds.toString() },
        });
      }
    },
    onCancel() {
      dispatch({
        type: 'users/gotoList',
      });
    },
    onCheck(info) {
      dispatch({
        type: 'users/selectRoles',
        payload: info,
      });
    },
    onExpand(expandedKeys) {
      dispatch({
        type: 'users/setValue',
        payload: {expandedRoleIds: expandedKeys, autoExpandParent: false},
      });
    },
    onChange(expandedKeys, searchValue, autoExpandParent) {
      dispatch({
        type: 'users/setValue',
        payload: {expandedRoleIds: expandedKeys, searchValue, autoExpandParent},
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
function mapStateToProps({ userAuth }) {
  return { userAuth };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAuth);
