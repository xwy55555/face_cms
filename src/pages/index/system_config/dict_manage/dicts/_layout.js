import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import CAction from './components/CAction';
import CSearch from './components/CSearch';
import styles from '../../../../../styles/util/ListLayout.less';
import * as projectUtil from '../../../../../utils/rbacProjectUtil';

function Dicts({ children, location, dispatch, dicts }) {
  const { curActionName, actionBarVisible, selectedRowKeys, typeDataSource, curTypeId } = dicts;
  const actionProps = {
    gotoAdd() {
      dispatch({
        type: 'dicts/gotoAdd',
        payload: {type_id: curTypeId}
      });
    },
    gotoDeleteBatch() {
      if (selectedRowKeys === undefined || selectedRowKeys === null || selectedRowKeys.length === 0) {
        message('请至少选中一条您想删除的记录');
      } else {
        dispatch({
          type: 'dicts/deleteBatch',
          payload: selectedRowKeys,
        });
      }
    },
  };
  const searchProps = {
    itemArray: typeDataSource,
    curItemKey: curTypeId + "",
    onSearch(id) {
      dispatch({
        type: 'dicts/gotoList',
        payload: {type_id: id},
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

Dicts.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ dicts }) {
  return {dicts};
}

// 建立数据关联关系
export default connect(mapStateToProps)(Dicts);
