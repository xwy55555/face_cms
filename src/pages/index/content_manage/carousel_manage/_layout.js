import React from 'react';
import PropTypes from 'prop-types';

function CarouselManage({ children }) {
  return (
    <div>{children}</div>
  );
}

CarouselManage.propTypes = {
  children: PropTypes.object,
};

// 建立数据关联关系
export default CarouselManage;