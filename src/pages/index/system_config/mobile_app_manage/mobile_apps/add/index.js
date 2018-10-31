import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RAdd({ dispatch, mobileAppAdd }) {
  const { curRecord, curAction } = mobileAppAdd;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: `mobileApps/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'mobileApps/gotoList',
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
function mapStateToProps({ mobileAppAdd }) {
  return { mobileAppAdd };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAdd);
