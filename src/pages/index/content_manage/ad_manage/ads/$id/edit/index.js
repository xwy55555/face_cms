import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';
import * as rbacProjectAuth from "../../../../../../../utils/rbacProjectAuth";

function REdit({ dispatch, adEdit }) {
  const { curRecord, curAction } = adEdit;

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

REdit.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ adEdit }) {
  return { adEdit };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
