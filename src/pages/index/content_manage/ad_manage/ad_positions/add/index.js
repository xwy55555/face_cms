import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RAdd({ dispatch, adPositionAdd }) {
  const { curRecord, curAction } = adPositionAdd;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: `adPositions/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'adPositions/gotoList',
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
function mapStateToProps({ adPositionAdd }) {
  return { adPositionAdd };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAdd);
