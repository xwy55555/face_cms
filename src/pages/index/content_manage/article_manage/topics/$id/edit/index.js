import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function REdit({ dispatch, topicEdit }) {
  const { curRecord } = topicEdit;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: 'topicEdit/edit',
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

REdit.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ topicEdit }) {
  return { topicEdit };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
