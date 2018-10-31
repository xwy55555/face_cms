import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RView({ dispatch, roleView }) {
  const { curRecord } = roleView;

  const formProps = {
    item: curRecord,
    gotoEdit(id) {
      dispatch({
        type: 'roles/gotoEdit',
        payload: id,
      });
    },
    gotoList() {
      dispatch({
        type: 'roles/gotoList',
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
function mapStateToProps({ roleView }) {
  return { roleView };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RView);
