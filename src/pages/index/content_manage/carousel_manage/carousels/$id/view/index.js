import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RView({ dispatch, carouselView }) {
  const { curRecord } = carouselView;

  const formProps = {
    item: curRecord,
    gotoEdit(id) {
      dispatch({
        type: 'carousels/gotoEdit',
        payload: id,
      });
    },
    gotoList() {
      dispatch({
        type: 'carousels/gotoList',
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
function mapStateToProps({ carouselView }) {
  return { carouselView };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RView);
