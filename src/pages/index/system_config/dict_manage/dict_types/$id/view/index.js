import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RView({ location, dispatch, dictTypeView }) {
  const { curRecord } = dictTypeView;

  const formProps = {
    item: curRecord,
    gotoEdit(id) {
      dispatch({
        type: 'dictTypes/gotoEdit',
        payload: id,
      });
    },
    gotoList() {
      dispatch({
        type: 'dictTypes/gotoList',
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
function mapStateToProps({ dictTypeView }) {
  return { dictTypeView };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RView);
