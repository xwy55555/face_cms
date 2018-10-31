import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RView({ location, dispatch, provinceView }) {
  const { curRecord } = provinceView;

  const formProps = {
    item: curRecord,
    gotoEdit(id) {
      dispatch({
        type: 'provinces/gotoEdit',
        payload: id,
      });
    },
    gotoList() {
      dispatch({
        type: 'provinces/gotoList',
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
function mapStateToProps({ provinceView }) {
  return { provinceView };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RView);
