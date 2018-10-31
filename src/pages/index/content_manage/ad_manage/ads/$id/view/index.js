import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';
import * as rbacProjectAuth from "../../../../../../../utils/rbacProjectAuth";

function RView({ dispatch, adView }) {
  const { curRecord } = adView;

  const formProps = {
    item: curRecord,
    apiUrlUploadByByte: rbacProjectAuth.getResourceUrl_uploadByByte(),
    updateImagePathName(imagePathName) {
      curRecord.image_path_name = imagePathName;
      dispatch({
        type: 'ads/updateCurRecord',
        payload: {curRecord:curRecord},
      });
    },
    onSubmit(data) {
      dispatch({
        type: `ads/${curAction}`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'ads/gotoList',
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
function mapStateToProps({ adView }) {
  return { adView };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RView);
