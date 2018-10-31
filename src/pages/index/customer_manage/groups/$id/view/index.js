import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RView({ dispatch, groupView }) {
  const { curRecord } = groupView;

  const formProps = {
    item: curRecord,
    gotoEdit(id) {
      dispatch({
        type: 'groups/gotoEdit',
        payload: id,
      });
    },
    gotoList() {
      dispatch({
        type: 'groups/gotoList',
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
function mapStateToProps({ groupView }) {
  return { groupView };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RView);
