import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import CAction from './components/CAction';
import CSearch from './components/CSearch';
import styles from '../../../../../styles/util/ListLayout.less';
import * as projectUtil from '../../../../../utils/rbacProjectUtil';

function Articles({ children, dispatch, articles }) {
  const { curActionName, actionBarVisible, selectedRowKeys, topicDataSource, curTopicID } = articles;
  const actionProps = {
    gotoAdd() {
      dispatch({
        type: 'articles/gotoAdd',
        payload:{topic_id: curTopicID}
      });
    },
    gotoDeleteBatch() {
      if (selectedRowKeys === undefined || selectedRowKeys === null || selectedRowKeys.length === 0) {
        message.info('请至少选中一条您想删除的记录');
      } else {
        dispatch({
          type: 'articles/deleteBatch',
          payload: selectedRowKeys,
        });
      }
    },
  };
  const searchProps = {
    itemArray: topicDataSource,
    curItemKey: curTopicID + "",
    onTabClick(key) {
      dispatch({
        type: 'articles/gotoList',
        payload: {topic_id: key },
      });
    },
  };
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
          <div className={styles.actionBar} style={{ 'display': (actionBarVisible === true  ?  'inline' : 'none') }}>
            <CAction {...actionProps}/>
          </div>
        </div>
      </div>
      <div style={{ 'display': (actionBarVisible === true  ?  'inline' : 'none') }}>
        <CSearch {...searchProps}/>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {children}
        </div>
      </div>
    </div>
  );
}

Articles.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ articles }) {
  return { articles };
}

// 建立数据关联关系
export default connect(mapStateToProps)(Articles);
