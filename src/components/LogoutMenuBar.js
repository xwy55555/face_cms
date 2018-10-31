import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './LogoutMenuBar.less';

/* 登出系统菜单 */
const LogoutMenuBar = ({
  curUserName,
}) => {
  return (
    <div>
      <div className={styles.divWelcome}><label>欢迎您，{curUserName}</label></div>
      <div className={styles.divLogout}>
        <Menu theme="light" mode="horizontal" className={styles.menu}>
          <Menu.Item key="0"><Link to="/"><Icon style={{ 'color': 'red', fontSize: 18 }} type="logout"/>退出系统</Link></Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

LogoutMenuBar.propTypes = {
};

export default LogoutMenuBar;
