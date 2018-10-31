import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function REdit({ dispatch, groupEdit }) {
  const { curRecord } = groupEdit;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: 'groupEdit/edit',
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

REdit.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ groupEdit }) {
  return { groupEdit };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
