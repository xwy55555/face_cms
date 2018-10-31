import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RAdd({ location, dispatch, dictTypeAdd }) {
  const { curRecord, curAction } = dictTypeAdd;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: `dictTypes/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'dictTypes/gotoList',
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
function mapStateToProps({ dictTypeAdd }) {
  return { dictTypeAdd };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAdd);
