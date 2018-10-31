import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RAdd({ dispatch, roleAdd }) {
  const { curRecord } = roleAdd;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: 'roles/add',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'roles/gotoList',
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
function mapStateToProps({ roleAdd }) {
  return { roleAdd };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAdd);
