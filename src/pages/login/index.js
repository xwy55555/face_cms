import React from 'react';
import { connect } from 'dva';
import * as rbacProjectUtil from '../../utils/rbacProjectUtil';
import CForm from './components/CForm';
import styles from './index.less';

function UserLogin({ dispatch, userLogin }) {
  const { loading } = userLogin;
  const formProps = {
    loading,
    onLogin(fieldsValue) {
      dispatch({
        type: 'userLogin/login',
        payload: fieldsValue,
      });
    },
  };
  return (
    <div className={styles.normal}>
      <h1>&nbsp;欢迎使用{ rbacProjectUtil.getProjectName() }</h1>
      <CForm { ...formProps }/>
    </div>
  );
}

// 指定订阅数据
function mapStateToProps({ userLogin }) {
  return { userLogin };
}

// 建立数据关联关系
export default connect(mapStateToProps)(UserLogin);
