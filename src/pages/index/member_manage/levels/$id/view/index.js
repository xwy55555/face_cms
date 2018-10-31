import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RView({ dispatch, levelView }) {
  const { curRecord } = levelView;

  const formProps = {
    item: curRecord,
    gotoEdit(id) {
      dispatch({
        type: 'levels/gotoEdit',
        payload: id,
      });
    },
    gotoList() {
      dispatch({
        type: 'levels/gotoList',
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
function mapStateToProps({ levelView }) {
  return { levelView };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RView);
