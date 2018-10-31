import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RAdd({ dispatch, userAddressAdd }) {
  const { curRecord, curAction, areaTreeDataSource } = userAddressAdd;

  const formProps = {
    item: curRecord,
    areaTreeDataSource: areaTreeDataSource,
    onSubmit(data) {
      dispatch({
        type: 'userAddressAdd/add',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'userAddresses/gotoList',
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
function mapStateToProps({ userAddressAdd }) {
  return { userAddressAdd };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAdd);
