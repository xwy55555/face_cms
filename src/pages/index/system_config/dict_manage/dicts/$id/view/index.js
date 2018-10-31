import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RView({ location, dispatch, dictView }) {
  const { curRecord } = dictView;

  const formProps = {
    item: curRecord,
    gotoEdit(id) {
      dispatch({
        type: 'dicts/gotoEdit',
        payload: id,
      });
    },
    gotoList() {
      dispatch({
        type: 'dicts/gotoList',
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
function mapStateToProps({ dictView }) {
  return { dictView };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RView);
