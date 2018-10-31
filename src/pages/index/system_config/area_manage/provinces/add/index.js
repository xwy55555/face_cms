import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RAdd({ location, dispatch, provinceAdd }) {
  const { curRecord, dataSource } = provinceAdd;

  const formProps = {
    item: curRecord,
    dataSource: dataSource,
    onSubmit(data) {
      dispatch({
        type: 'provinceAdd/add',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'provinces/gotoList',
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
function mapStateToProps({ provinceAdd }) {
  return { provinceAdd };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAdd);
