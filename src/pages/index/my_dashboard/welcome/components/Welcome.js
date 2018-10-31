import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from '../../../../../styles/util/ListLayout.less';
import * as projectUtil from '../../../../../utils/rbacProjectUtil';

function Welcome({ welcome }) {
  const { curActionName, actionBarVisible } = welcome;
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
          <div className={styles.actionBar} style={{ 'display': (actionBarVisible === true  ?  'inline' : 'none') }}></div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h1>welcome to { projectUtil.getProjectCode() }</h1>
          <br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/>
          <br/>
        </div>
      </div>
    </div>
  );
}

Welcome.propTypes = {
  welcome: PropTypes.object,
};

// 指定订阅数据
function mapStateToProps({ welcome }) {
  return {welcome};
}

// 建立数据关联关系
export default connect(mapStateToProps)(Welcome);
