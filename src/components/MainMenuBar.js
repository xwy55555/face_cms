import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './MainMenuBar.less';

/* 主菜单 */
const MainMenuBar = ({
  curItemKey,
  itemArray,
}) => {
  let showMenus = itemArray.map((item)=>{
      return <Menu.Item key={item.key}><Link to={item.link}><Icon style={{ 'color': 'green', fontSize: 18 }} type={item.icon} spin={false}/>{item.name}</Link></Menu.Item>
  });
  return (
    <Menu theme="light" mode="horizontal" defaultSelectedKeys={[curItemKey]} selectedKeys={[curItemKey]} className={styles.menu}>
      {showMenus}
    </Menu>
  );
};

MainMenuBar.propTypes = {
  curItemId: PropTypes.string,
  itemArray: PropTypes.array,
};

export default MainMenuBar;
