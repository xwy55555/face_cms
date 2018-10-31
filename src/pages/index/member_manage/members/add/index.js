import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RAdd({ location, dispatch, memberAdd }) {
  const { curRecord, levelDataSource } = memberAdd;

  const formProps = {
    item: curRecord,
    levelDataSource,
    onSubmit(data) {
      dispatch({
        type: 'memberAdd/add',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'members/gotoList',
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
function mapStateToProps({ memberAdd }) {
  return { memberAdd };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAdd);
