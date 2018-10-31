import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RView({ location, dispatch, menuView }) {
  const { curRecord } = menuView;

  const formProps = {
    item: curRecord,
    gotoEdit(id) {
      dispatch({
        type: 'menus/gotoEdit',
        payload: id,
      });
    },
    gotoList() {
      dispatch({
        type: 'menus/gotoList',
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
function mapStateToProps({ menuView }) {
  return { menuView };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RView);
