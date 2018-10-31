import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RAdd({ dispatch, taskAdd }) {
  const { curRecord } = taskAdd;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: 'taskAdd/add',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'tasks/gotoList',
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
function mapStateToProps({ taskAdd }) {
  return { taskAdd };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAdd);
