import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RAdd({ dispatch, userDebitCards }) {
  const { curRecord, curAction } = userDebitCards;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: `userDebitCards/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'userDebitCards/gotoList',
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
function mapStateToProps({ userDebitCards }) {
  return { userDebitCards };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAdd);
