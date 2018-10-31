import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function REdit({ location, dispatch, cityAndCountyEdit }) {
  const { curRecord, curAction, areaDataSource } = cityAndCountyEdit;

  const formProps = {
    item: curRecord,
    dataSource: areaDataSource,
    onSubmit(data) {
      dispatch({
        type: `citiesAndCounties/${curAction}`,
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

REdit.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ cityAndCountyEdit }) {
  return { cityAndCountyEdit };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
