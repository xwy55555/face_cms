import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function REdit({ dispatch, carouselEdit }) {
  const { curRecord } = carouselEdit;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: 'carouselEdit/edit',
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

REdit.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ carouselEdit }) {
  return { carouselEdit };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
