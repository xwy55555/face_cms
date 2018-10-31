import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RAdd({ location, dispatch, cityAndCountyAdd }) {
  const { curRecord, curAction, areaDataSource } = cityAndCountyAdd;

  const formProps = {
    item: curRecord,
    dataSource: areaDataSource,
    onSubmit(data) {
      dispatch({
        type: 'cityAndCountyAdd/add',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'citiesAndCounties/gotoList',
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
function mapStateToProps({ cityAndCountyAdd }) {
  return { cityAndCountyAdd };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAdd);
