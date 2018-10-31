import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';
import * as rbacProjectAuth from "../../../../../../../utils/rbacProjectAuth";

function RView({ dispatch, carouselItemView }) {
  const { curRecord } = carouselItemView;

  const formProps = {
    item: curRecord,
    gotoEdit(id) {
      dispatch({
        type: 'carouselItems/gotoEdit',
        payload: id,
      });
    },
    gotoList(carouselID) {
      dispatch({
        type: 'carouselItems/gotoList',
        payload: { carousel_id: carouselID },
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
function mapStateToProps({ carouselItemView }) {
  return { carouselItemView };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RView);
