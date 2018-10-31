import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function Index({ dispatch, userAddressEdit }) {
  const { curRecord, areaTreeDataSource } = userAddressEdit;

  const formProps = {
    item: curRecord,
    areaTreeDataSource: areaTreeDataSource,
    onSubmit(data) {
      dispatch({
        type: 'userAddressEdit/edit',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'userAddresses/gotoList',
      });
    },
  };
  return (
    <CForm {...formProps} />
  );
}

Index.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ userAddressEdit }) {
  return { userAddressEdit };
}

// 建立数据关联关系
export default connect(mapStateToProps)(Index);
