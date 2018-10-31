import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RView({ dispatch, userAddressView }) {
  const { curRecord } = userAddressView;

  const formProps = {
    item: curRecord,
    gotoEdit(id) {
      dispatch({
        type: 'userAddresses/gotoEdit',
        payload: id,
      });
    },
    gotoList() {
      dispatch({
        type: 'userAddresses/gotoList',
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
function mapStateToProps({ userAddressView }) {
  return { userAddressView };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RView);
