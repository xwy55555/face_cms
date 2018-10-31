import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from '../../../dict_banks/$id/edit/components/CForm';

function REdit({ location, dispatch, dictEdit }) {
  const { curRecord, curAction, typeDataSource, curTypeId } = dictEdit;

  const formProps = {
    item: curRecord,
    typeDataSource: typeDataSource,
    onSubmit(data) {
      dispatch({
        type: `dicts/${curAction}`,
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

REdit.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ dictEdit }) {
  return { dictEdit };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
