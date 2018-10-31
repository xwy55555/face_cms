import React from 'react';
import PropTypes from 'prop-types';

function ArticleManage({ children }) {
  return (
    <div>{children}</div>
  );
}

ArticleManage.propTypes = {
  children: PropTypes.object,
};

// 建立数据关联关系
export default ArticleManage;