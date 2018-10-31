import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function REdit({ dispatch, adPositionEdit }) {
  const { curRecord, curAction } = adPositionEdit;

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

REdit.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ adPositionEdit }) {
  return { adPositionEdit };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
