import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RAdd({ dispatch, dictBankAdd }) {
  const { curRecord } = dictBankAdd;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: 'dictBankAdd/add',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'dictBanks/gotoList',
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
function mapStateToProps({ dictBankAdd }) {
  return { dictBankAdd };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAdd);
