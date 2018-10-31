import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RAdd({ dispatch, mobileAppConfigAdd }) {
  const { curRecord, curAction, mobileAppDataSource } = mobileAppConfigAdd;

  const formProps = {
    item: curRecord,
    mobileAppDataSource,
    onSubmit(data) {
      dispatch({
        type: `mobileAppConfigs/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'mobileAppConfigs/gotoList',
      });
    },
  };
  return (
    <CForm {...formProps} />
  );
}

RAdd.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ mobileAppConfigAdd }) {
  return { mobileAppConfigAdd };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAdd);
