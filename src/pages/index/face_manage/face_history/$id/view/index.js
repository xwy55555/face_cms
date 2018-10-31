import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RView({ dispatch, faceHistoryView }) {
  const { curRecord } = faceHistoryView;

  const formProps = {
    item: curRecord,
    gotoEdit(id) {
      dispatch({
        type: 'faceHistory/gotoEdit',
        payload: id,
      });
    },
    gotoList() {
      dispatch({
        type: 'faceHistory/gotoList',
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
function mapStateToProps({ faceHistoryView }) {
  return { faceHistoryView };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RView);
