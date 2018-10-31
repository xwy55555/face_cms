import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RView({ location, dispatch, cityAndCountyView }) {
  const { curRecord } = cityAndCountyView;

  const formProps = {
    item: curRecord,
    gotoEdit(id) {
      dispatch({
        type: 'citiesAndCounties/gotoEdit',
        payload: id,
      });
    },
    gotoList() {
      dispatch({
        type: 'citiesAndCounties/gotoList',
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
function mapStateToProps({ cityAndCountyView }) {
  return { cityAndCountyView };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RView);
