import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RView({ dispatch, userView }) {
  const { curRecord } = userView;

  const formProps = {
    item: curRecord,
    gotoEdit(id) {
      dispatch({
        type: 'users/gotoEdit',
        payload: id,
      });
    },
    gotoList() {
      dispatch({
        type: 'users/gotoList',
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
function mapStateToProps({ userView }) {
  return { userView };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RView);
