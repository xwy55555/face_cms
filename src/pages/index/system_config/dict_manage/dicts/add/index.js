import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from '../../dict_banks/add/components/CForm';

function RAdd({ location, dispatch, dictAdd }) {
  const { curRecord, typeDataSource, curTypeId } = dictAdd;

  const formProps = {
    item: curRecord,
    typeDataSource: typeDataSource,
    onSubmit(data) {
      dispatch({
        type: 'dicts/add',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'dicts/gotoList',
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
function mapStateToProps({ dictAdd }) {
  return { dictAdd };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAdd);
