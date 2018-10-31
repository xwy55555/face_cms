import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { message } from 'antd';
import CAction from './components/CAction';
import CSearch from './components/CSearch';
import styles from '../../../../styles/util/ListLayout.less';
import * as projectUtil from '../../../../utils/rbacProjectUtil';

function Users({ children, dispatch, users }) {
  const { curActionName, actionBarVisible, conditionName, conditionAccount, conditionMobile, conditionCode, selectedRowKeys } = users;
  const actionProps = {
    gotoAdd() {
      dispatch({
        type: 'users/gotoAdd',
      });
    },
    gotoDeleteBatch() {
      if (selectedRowKeys === undefined || selectedRowKeys === null || selectedRowKeys.length === 0) {
        message.info('请至少选中一条您想删除的记录');
      } else {
        dispatch({
          type: 'users/deleteBatch',
          payload: selectedRowKeys,
        });
      }
    },
  };
  const searchProps = {
    name: conditionName,
    account: conditionAccount,
    mobile: conditionMobile,
    code: conditionCode,
    onSearch(fieldsValue) {
      dispatch({
        type: 'users/gotoList',
        payload: { ...fieldsValue },
      });
    },
  };
  return (
    <div className={styles.listLayout}>
      <div className={styles.header}>
        <div className={styles.wrapper}>
          <div className={styles.titleBar}>
            <h3>
              <Link to={ projectUtil.getCurMenuLink() }>{ projectUtil.getCurMenuName() }</Link>
              <label>{curActionName === '' ? '' : ' -- ' + curActionName}</label>
            </h3>
          </div>
          <div className={styles.actionBar} style={{ 'display': (actionBarVisible === true  ?  'inline' : 'none') }}>
            <CAction {...actionProps}/>
          </div>
        </div>
      </div>
      <div style={{ 'display': (actionBarVisible === true  ?  'inline' : 'none') }}>
        <CSearch {...searchProps}/>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {children}
        </div>
      </div>
    </div>
  );
}

Users.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ users }) {
  return { users };
}

// 建立数据关联关系
export default connect(mapStateToProps)(Users);
