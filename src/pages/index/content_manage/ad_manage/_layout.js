import React from 'react';
import PropTypes from 'prop-types';

function AdManage({ children }) {
  return (
    <div>{children}</div>
  );
}

AdManage.propTypes = {
  children: PropTypes.object,
};

// 建立数据关联关系
export default AdManage;