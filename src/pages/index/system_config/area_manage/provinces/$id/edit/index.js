import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function REdit({ location, dispatch, provinceEdit }) {
  const { curRecord, dataSource } = provinceEdit;

  const formProps = {
    item: curRecord,
    dataSource: dataSource,
    onSubmit(data) {
      dispatch({
        type: 'provinceEdit/edit',
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

REdit.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ provinceEdit }) {
  return { provinceEdit };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
