import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function REdit({ dispatch, levelEdit }) {
  const { curRecord } = levelEdit;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: 'levelEdit/edit',
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

REdit.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ levelEdit }) {
  return { levelEdit };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
