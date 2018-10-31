import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { message } from 'antd';
import CAction from './components/CAction';
import styles from '../../../../../styles/util/ListLayout.less';
import * as projectUtil from '../../../../../utils/rbacProjectUtil';

function Provinces({ children, location, dispatch, provinces }) {
  const { curActionName, actionBarVisible, selectedRowKeys } = provinces;
  const actionProps = {
    gotoAdd() {
      dispatch({
        type: 'provinces/gotoAdd',
      });
    },
    gotoDeleteBatch() {
      if (selectedRowKeys === undefined || selectedRowKeys === null || selectedRowKeys.length === 0) {
        message.info('请至少选中一条您想删除的记录');
      } else {
        dispatch({
          type: 'provinces/deleteBatch',
          payload: selectedRowKeys,
        });
      }
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
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {children}
        </div>
      </div>
    </div>
  );
}

Provinces.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ provinces }) {
  return { provinces };
}

// 建立数据关联关系
export default connect(mapStateToProps)(Provinces);
