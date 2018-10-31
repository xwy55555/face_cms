import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

/* 侧边菜单 */
const SideMenuBar = ({
  curItemKey,
  itemArray,
}) => {
  let showMenus = itemArray.map((item)=>{
      if (item.children === undefined || item.children === null || item.children.length <= 0) {
        //叶子节点：没有子节点
        return <Menu.Item key={item.key}><Link to={item.link}><Icon style={{ 'color': 'green', fontSize: 16 }}  type={item.icon}/>{item.name}</Link></Menu.Item>
      } else {
        //枝节点：有子节点
        return <Menu.SubMenu key={item.key} title={<span><Icon style={{ 'color': 'green', fontSize: 16 }}  type={item.icon}/>{item.name}</span>}>{
            item.children.map((child) =>{
              return <Menu.Item key={child.key}><Link to={child.link}>{child.name}</Link></Menu.Item>;
            })
          }
        </Menu.SubMenu>
      }
  });
  return (
    <Menu theme="light" mode="inline" defaultSelectedKeys={[curItemKey]} selectedKeys={[curItemKey]}>
      {showMenus}
    </Menu>
  );
};

SideMenuBar.propTypes = {
  curItemId: PropTypes.string,
  itemArray: PropTypes.array,
};

export default SideMenuBar;
