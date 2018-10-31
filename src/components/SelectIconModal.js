import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon } from 'antd';
import styles from './SelectIconModal.less';

/**
 * 选择图标
 * @param visible
 * @param onOk
 * @param onCancel
 * @param onItemClick
 * @returns {XML}
 * @constructor
 */
const SelectIconModal = ({
  visible,
  onOk,
  onCancel,
  onItemClick,
}) => {
  function handleOk() {
    onOk();
  }
  const modalOpts = {
    title: '选择图标',
    width:800,
    maskClosable: false,
    visible,
    onOk: handleOk,
    onCancel,
  };
  const icons = {
    direction: ['step-backward', 'step-forward', 'fast-backward', 'fast-forward', 'shrink', 'arrows-alt', 'down', 'up', 'left', 'right', 'caret-up', 'caret-down', 'caret-left', 'caret-right', 'up-circle', 'down-circle', 'left-circle', 'right-circle', 'up-circle-o', 'down-circle-o', 'right-circle-o', 'left-circle-o', 'double-right', 'double-left', 'verticle-left', 'verticle-right', 'forward', 'backward', 'rollback', 'enter', 'retweet', 'swap', 'swap-left', 'swap-right', 'arrow-up', 'arrow-down', 'arrow-left', 'arrow-right', 'play-circle', 'play-circle-o', 'up-square', 'down-square', 'left-square', 'right-square', 'up-square-o', 'down-square-o', 'left-square-o', 'right-square-o'],
    suggestion: ['question', 'question-circle-o', 'question-circle', 'plus', 'plus-circle-o', 'plus-circle', 'pause', 'pause-circle-o', 'pause-circle', 'minus', 'minus-circle-o', 'minus-circle', 'plus-square', 'plus-square-o', 'minus-square', 'minus-square-o', 'info', 'info-circle-o', 'info-circle', 'exclamation', 'exclamation-circle-o', 'exclamation-circle', 'close', 'close-circle', 'close-circle-o', 'close-square', 'close-square-o', 'check', 'check-circle', 'check-circle-o', 'check-square', 'check-square-o', 'clock-circle-o', 'clock-circle'],
    other: ['lock', 'unlock', 'android', 'apple', 'apple-o', 'area-chart', 'pie-chart', 'bar-chart', 'dot-chart', 'bars', 'book', 'calendar', 'cloud', 'cloud-download', 'code', 'code-o', 'copy', 'credit-card', 'delete', 'desktop', 'download', 'edit', 'ellipsis', 'file', 'file-text', 'file-unknown', 'file-pdf', 'file-excel', 'file-jpg', 'file-ppt', 'folder', 'folder-open', 'github', 'hdd', 'frown', 'frown-o', 'meh', 'meh-o', 'smile', 'smile-o', 'inbox', 'laptop', 'appstore-o', 'appstore', 'line-chart', 'link', 'logout', 'mail', 'menu-fold', 'menu-unfold', 'mobile', 'notification', 'paper-clip', 'picture', 'poweroff', 'reload', 'search', 'setting', 'share-alt', 'shopping-cart', 'tablet', 'tag', 'tag-o', 'tags', 'tags-o', 'to-top', 'upload', 'user', 'video-camera', 'windows', 'windows-o', 'ie', 'chrome', 'home', 'loading', 'cloud-upload-o', 'cloud-download-o', 'cloud-upload', 'cloud-o', 'star-o', 'star', 'heart-o', 'heart', 'environment', 'environment-o', 'eye', 'eye-o', 'camera', 'camera-o', 'aliwangwang', 'aliwangwang-o', 'save', 'team', 'solution', 'phone', 'filter', 'exception', 'export', 'customer-service', 'qrcode', 'scan', 'like', 'dislike', 'message', 'pay-circle', 'pay-circle-o', 'calculator', 'pushpin', 'pushpin-o'],
  };
  let directionIcons = icons['direction'].map((type) => {
    //console.log("type = " + type);
    return <li key={type} onClick={() => onItemClick(type)}>
      <Icon className={styles.anticon} type={type}/>
      <span className={styles.anticonClass}>{type}</span>
    </li>
  });
  let suggestionIcons = icons['suggestion'].map((type) => {
    //console.log("type = " + type);
    return <li key={type} onClick={() => onItemClick(type)}>
      <Icon className={styles.anticon} type={type}/>
      <span className={styles.anticonClass}>{type}</span>
    </li>
  });
  let otherIcons = icons['other'].map((type) => {
    //console.log("type = " + type);
    return <li key={type} onClick={() => onItemClick(type)}>
      <Icon className={styles.anticon} type={type}/>
      <span className={styles.anticonClass}>{type}</span>
    </li>
  });
  return (
    <Modal{...modalOpts}>
      <div style={{height:600,overflowX:"auto"}}>
        <div>
          <h3>方向性图标</h3>
          <ul className={styles.anticonsList}>
            {directionIcons}
          </ul>
        </div>
        <div>
          <h3>提示建议性图标</h3>
          <ul className={styles.anticonsList}>
            {suggestionIcons}
          </ul>
        </div>
        <div>
          <h3>网站通用图标</h3>
          <ul className={styles.anticonsList}>
            {otherIcons}
          </ul>
        </div>
      </div>
    </Modal>
  );
};

SelectIconModal.propTypes = {
  visible: PropTypes.any,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  onSelectIcon: PropTypes.func,
};

export default SelectIconModal;
