import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RAdd({ dispatch, carouselAdd }) {
  const { curRecord } = carouselAdd;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: 'carouselAdd/add',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'carousels/gotoList',
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
function mapStateToProps({ carouselAdd }) {
  return { carouselAdd };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAdd);
