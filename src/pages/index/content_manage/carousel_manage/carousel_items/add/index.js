import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';
import * as rbacProjectAuth from "../../../../../../utils/rbacProjectAuth";

function RAdd({ dispatch, carouselItemAdd }) {
  const { curRecord } = carouselItemAdd;

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
        type: `carouselItems/${curAction}`,
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

RAdd.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ carouselItemAdd }) {
  return { carouselItemAdd };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAdd);
