import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './CForm';

function REdit({ location, dispatch, changePassword }) {
  const { curRecord, } = changePassword;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: `changePassword/changePassword`,
        payload: data,
      });
    },
  };
  return (
    <CForm {...formProps} />
  );
}

REdit.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ changePassword }) {
  return { changePassword };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
