import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RAdd({ dispatch, levelAdd }) {
  const { curRecord, curAction } = levelAdd;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: `levels/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'levels/gotoList',
      });
    },
  };
  return (
    <CForm {...formProps} />
  );
}

RAdd.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ levelAdd }) {
  return { levelAdd };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAdd);
