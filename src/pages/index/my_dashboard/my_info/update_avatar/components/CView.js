import React from 'react';
import PropTypes from 'prop-types';
import { Form, Tooltip } from 'antd';
import sexMale from '../../../../../../assets/sex/male.png';
import sexFemale from '../../../../../../assets/sex/male.png';
import styles from './UpdateAvatar.less';

const CView = ({
  item = {},
  gotoEdit,
}) => {
  function getAvatarUrl() {
    let resultValue = sexMale;
    if (item.avatar_url === null || item.avatar_url === undefined) {
      if (item.sex === null || item.sex === undefined) {
      } else if (item.sex === 'female') {
        resultValue = sexFemale;
      }
    } else {
      resultValue = item.avatar_url;
    }
    console.log(resultValue);
    return resultValue;
  }
  let avatarUrl = getAvatarUrl();
  return (
    <div className={styles.avatarLayout}>
      <Tooltip title="点击可以上传新的头像">
        <img src={avatarUrl} className={styles.avatar} onClick={gotoEdit}/>
      </Tooltip>
    </div>
  );
};

CView.propTypes = {
  visible: PropTypes.any,
};

export default Form.create()(CView);
