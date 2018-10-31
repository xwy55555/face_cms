import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CForm from './CForm';

function REdit({ location, dispatch, baseInfo }) {
  const { curRecord } = baseInfo;

  const formProps = {
    item: curRecord,
    onSubmit(data) {
      dispatch({
        type: 'baseInfo/edit',
        payload: data,
      });
    },
    onCancel() {
      dispatch(routerRedux.push({
        pathname: 'index/my_dashboard/my_info/base_info',
      }));
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
function mapStateToProps({ baseInfo }) {
  return { baseInfo };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
