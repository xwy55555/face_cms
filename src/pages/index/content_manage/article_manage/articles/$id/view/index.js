import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RView({ dispatch, articleView }) {
  const { curRecord } = articleView;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: 'articleView/edit',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'articles/gotoList',
      });
    },
  };
  return (
    <CForm {...formProps} />
  );
}

RView.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ articleView }) {
  return { articleView };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RView);
