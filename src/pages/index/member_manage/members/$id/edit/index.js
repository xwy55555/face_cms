import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function REdit({ location, dispatch, members }) {
  const { curRecord, curAction, levelDataSource } = members;

  const formProps = {
    item: curRecord,
    levelDataSource,
    onSubmit(data) {
      dispatch({
        type: `members/${curAction}`,
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

REdit.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ members }) {
  return { members };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
