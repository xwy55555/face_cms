import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function REdit({ dispatch, taskEdit }) {
  const { curRecord } = taskEdit;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: 'taskEdit/edit',
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

REdit.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ taskEdit }) {
  return { taskEdit };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
