import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import * as util from '../../../../../../utils/tool/util';
import * as rbacProjectAuth from '../../../../../../utils/rbacProjectAuth';
import CForm from './components/CForm';

function RAdd({ dispatch, articleAdd }) {
  const { curRecord } = articleAdd;

  const formProps = {
    item: curRecord,
    apiUrlUploadByByte: rbacProjectAuth.getResourceUrl_uploadByByte(),
    updateImagePathName(imagePathName) {
      curRecord.image_path_name = imagePathName;
      dispatch({
        type: 'articleAdd/updateCurRecord',
        payload: {curRecord},
      });
    },
    addTag(tag) {
      let tags = curRecord.tags;
      tags = tags === null || tags === undefined ? tag : tags + ',' + tag;
      curRecord.tags = tags;
      dispatch({
        type: 'articles/updateCurRecord',
        payload: {curRecord},
      });
    },
    removeTag(tag) {
      let tags = curRecord.tags;
      tags = tags === null || tags === undefined ? '': util.trim(tags);
      if (tags === tag) {
        tags = '';
      } else {
        let tagArray = tags.split(',');
        tags = '';
        let iLength = tagArray.length;
        for (let i = 0; i < iLength; i ++) {
          if (tagArray[i] !== '' && tagArray[i] !== tag) {
            tags += tags === '' ? tagArray[i] : ',' + tagArray[i];
          }
        }
        curRecord.tags = tags;
        dispatch({
          type: 'articles/updateCurRecord',
          payload: {curRecord},
        });
      }
    },
    onSubmit(data) {
      dispatch({
        type: 'articleAdd/add',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'articles/gotoList',
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
function mapStateToProps({ articleAdd }) {
  return { articleAdd };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAdd);
