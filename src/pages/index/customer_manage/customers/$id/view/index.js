import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RView({ dispatch, customerView }) {
  const { curRecord } = customerView;

  const formProps = {
    item: curRecord,
    gotoEdit(id) {
      dispatch({
        type: 'customers/gotoEdit',
        payload: id,
      });
    },
    gotoList(groupID) {
      dispatch({
        type: 'customers/gotoList',
        payload: { group_id: groupID },
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
function mapStateToProps({ customerView }) {
  return { customerView };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RView);
