import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RView({ dispatch, taskView }) {
  const { curRecord } = taskView;

  const formProps = {
    item: curRecord,
    gotoEdit(id) {
      dispatch({
        type: 'tasks/gotoEdit',
        payload: id,
      });
    },
    gotoList() {
      dispatch({
        type: 'tasks/gotoList',
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
function mapStateToProps({ taskView }) {
  return { taskView };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RView);
