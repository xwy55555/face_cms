import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RAdd({ dispatch, userCreditCardAdd }) {
  const { curRecord, curAction } = userCreditCardAdd;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: `userCreditCards/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'userCreditCards/gotoList',
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
function mapStateToProps({ userCreditCardAdd }) {
  return { userCreditCardAdd };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAdd);
