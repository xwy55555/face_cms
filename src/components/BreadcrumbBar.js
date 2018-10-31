import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import { Link } from 'dva/router';

/* 面包屑导航 */
const BreadcrumbBar = ({
  itemArray
}) => {
  let showBreadcrumbs = itemArray.map((item)=>{
    //console.log("showBreadcrumbs :" + JSON.stringify(item));
    return <Breadcrumb.Item key={item.key}><Link to={item.link}>{item.name}</Link></Breadcrumb.Item>
  });
  return (
    <Breadcrumb>
      {showBreadcrumbs}
    </Breadcrumb>
  );
};

BreadcrumbBar.propTypes = {
  itemArray: PropTypes.array,
  onItemClick: PropTypes.func,
};

export default BreadcrumbBar;
