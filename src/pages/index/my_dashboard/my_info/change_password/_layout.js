import React from 'react';
import { Link } from 'dva/router';
import styles from '../../../../../styles/util/ListLayout.less';
import * as projectUtil from '../../../../../utils/rbacProjectUtil';

function ChangePassword({ children, }) {
  return (
    <div className={styles.listLayout}>
      <div className={styles.header}>
        <div className={styles.wrapper}>
          <div className={styles.titleBar}><h3><Link to={ projectUtil.getCurMenuLink() }>{ projectUtil.getCurMenuName() }</Link></h3></div>
          <div className={styles.actionBar}>&nbsp;</div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {children}
        </div>
      </div>
    </div>
  );
}

// 建立数据关联关系
export default ChangePassword;
