import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function REdit({ location, dispatch, dictTypeEdit }) {
  const { curRecord } = dictTypeEdit;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: 'dictTypeEdit/edit',
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

REdit.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ dictTypeEdit }) {
  return { dictTypeEdit };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
