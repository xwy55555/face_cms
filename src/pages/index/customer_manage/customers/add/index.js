import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RAdd({ dispatch, customerAdd }) {
  const { curRecord, groupDataSource } = customerAdd;

  const formProps = {
    item: curRecord,
    groupDataSource,
    onSubmit(data) {
      dispatch({
        type: 'customerAdd/add',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'customers/gotoList',
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
function mapStateToProps({ customerAdd }) {
  return { customerAdd };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAdd);
