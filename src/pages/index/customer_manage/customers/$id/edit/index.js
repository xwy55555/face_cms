import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function REdit({ dispatch, customerEdit }) {
  const { curRecord, curAction, groupDataSource } = customerEdit;

  const formProps = {
    item: curRecord,
    groupDataSource,
    onSubmit(data) {
      dispatch({
        type: `customers/${curAction}`,
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

REdit.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ customerEdit }) {
  return { customerEdit };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
