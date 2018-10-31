import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from './components/CTable';
import * as projectUtil from "../../../../../../utils/rbacProjectUtil";

function RList({ dispatch, topicList }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = topicList;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch({
        type: 'topics/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onShowSizeChange(current, pageSize) {
      dispatch({
        type: 'topics/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onView(id) {
      dispatch({
        type: 'topics/gotoView',
        payload: id,
      });
    },
    onEdit(id) {
      dispatch({
        type: 'topics/gotoEdit',
        payload: id,
      });
    },
    onDelete(id) {
      dispatch({
        type: 'topicList/delete',
        payload: id,
      });
    },
    gotoChildList(id) {
      projectUtil.setCurMenuLink('/index/article_manage/customers');
      dispatch({
        type: 'customers/gotoList',
        payload: {topic_id: id},
      });
    },
    onChangeOrderBy(record, flag) {
      dispatch({
        type: 'topics/changeOrderBy',
        payload: {
          id: record.id,
          flag: flag,
        },
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'topics/select',
        payload: selectedRowKeys,
      });
    }
  };
  return (
    <CTable {...tableProps}/>
  );
}

RList.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ topicList }) {
  return { topicList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
