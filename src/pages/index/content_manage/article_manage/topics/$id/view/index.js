import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RView({ dispatch, topicView }) {
  const { curRecord } = topicView;

  const formProps = {
    item: curRecord,
    gotoEdit(id) {
      dispatch({
        type: 'topics/gotoEdit',
        payload: id,
      });
    },
    gotoList() {
      dispatch({
        type: 'topics/gotoList',
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
function mapStateToProps({ topicView }) {
  return { topicView };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RView);
