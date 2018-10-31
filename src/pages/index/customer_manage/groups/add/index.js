import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RAdd({ dispatch, groupAdd }) {
  const { curRecord } = groupAdd;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: 'groupAdd/add',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'groups/gotoList',
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
function mapStateToProps({ groupAdd }) {
  return { groupAdd };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAdd);
