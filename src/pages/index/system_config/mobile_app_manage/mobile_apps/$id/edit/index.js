import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function REdit({ dispatch, mobileApps }) {
  const { curRecord, curAction } = mobileApps;

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

REdit.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ mobileApps }) {
  return { mobileApps };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
