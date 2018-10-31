import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function REdit({ dispatch, userAdd }) {
  const { curRecord, curAction } = userAdd;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: `users/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'users/gotoList',
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
function mapStateToProps({ userAdd }) {
  return { userAdd };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
