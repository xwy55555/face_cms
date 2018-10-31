import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function REdit({ dispatch, roleEdit }) {
  const { curRecord } = roleEdit;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: 'roleEdit/edit',
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

REdit.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ roleEdit }) {
  return { roleEdit };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
