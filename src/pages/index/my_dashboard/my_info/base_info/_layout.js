import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from '../../../../../styles/util/ListLayout.less';
import * as projectUtil from '../../../../../utils/rbacProjectUtil';

function BaseInfo({ children, baseInfo }) {
  const { curActionName, } = baseInfo;
  return (
    <div className={styles.listLayout}>
      <div className={styles.header}>
        <div className={styles.wrapper}>
          <div className={styles.titleBar}>
            <h3>
              <Link to={ projectUtil.getCurMenuLink() }>{ projectUtil.getCurMenuName() }</Link>
              <label>{curActionName === '' ? '' : ' -- ' + curActionName}</label>
            </h3>
          </div>
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

// 指定订阅数据
function mapStateToProps({ baseInfo }) {
  return { baseInfo };
}

// 建立数据关联关系
export default connect(mapStateToProps)(BaseInfo);
