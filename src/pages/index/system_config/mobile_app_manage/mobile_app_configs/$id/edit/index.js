import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function REdit({ dispatch, mobileAppConfigEdit }) {
  const { curRecord, curAction, mobileAppDataSource } = mobileAppConfigEdit;

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

REdit.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ mobileAppConfigEdit }) {
  return { mobileAppConfigEdit };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
