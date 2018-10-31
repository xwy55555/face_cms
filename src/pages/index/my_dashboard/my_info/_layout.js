import React from 'react';
import PropTypes from 'prop-types';

function MyInfo({ children }) {
  return (
    <div>{children}</div>
  );
}

MyInfo.propTypes = {
  children: PropTypes.object,
};

// 建立数据关联关系
export default MyInfo;
