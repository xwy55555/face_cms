import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RView({ location, dispatch, memberView }) {
  const { curRecord } = memberView;

  const formProps = {
    item: curRecord,
    gotoEdit(id) {
      dispatch({
        type: 'members/gotoEdit',
        payload: id,
      });
    },
    gotoList() {
      dispatch({
        type: 'members/gotoList',
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
function mapStateToProps({ memberView }) {
  return { memberView };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RView);
