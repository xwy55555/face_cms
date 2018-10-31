import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';
import * as rbacProjectAuth from "../../../../../../../utils/rbacProjectAuth";

function REdit({ dispatch, carouselItemEdit }) {
  const { curRecord } = carouselItemEdit;

  const formProps = {
    item: curRecord,
    apiUrlUploadByByte: rbacProjectAuth.getResourceUrl_uploadByByte(),
    updateImagePathName(imagePathName) {
      curRecord.image_path_name = imagePathName;
      dispatch({
        type: 'carouselItems/updateCurRecord',
        payload: {curRecord:curRecord},
      });
    },
    onSubmit(data) {
      dispatch({
        type: 'carouselItemEdit/edit',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'carouselItems/gotoList',
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
function mapStateToProps({ carouselItemEdit }) {
  return { carouselItemEdit };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
