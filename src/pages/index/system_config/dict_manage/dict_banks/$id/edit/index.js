import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function REdit({ dispatch, dictBankEdit }) {
  const { curRecord, curAction } = dictBankEdit;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: `dictBanks/${curAction}`,
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

REdit.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ dictBankEdit }) {
  return { dictBankEdit };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
