import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RView({ dispatch, dictBankView }) {
  const { curRecord } = dictBankView;

  const formProps = {
    item: curRecord,
    gotoEdit(id) {
      dispatch({
        type: 'dictBanks/gotoEdit',
        payload: id,
      });
    },
    gotoList() {
      dispatch({
        type: 'dictBanks/gotoList',
      });
    },
  };
  return (
    <CForm {...formProps} />
  );
}

RView.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ dictBankView }) {
  return { dictBankView };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RView);
