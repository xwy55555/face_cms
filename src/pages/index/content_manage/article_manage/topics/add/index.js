import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RAdd({ dispatch, topicAdd }) {
  const { curRecord } = topicAdd;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: 'topicAdd/add',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'topics/gotoList',
      });
    },
  };
  return (
    <CForm {...formProps} />
  );
}

RAdd.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ topicAdd }) {
  return { topicAdd };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAdd);
