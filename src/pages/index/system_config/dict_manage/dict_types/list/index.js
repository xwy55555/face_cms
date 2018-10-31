import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from './components/CTable';
import * as projectUtil from '../../../../../../utils/rbacProjectUtil';

function RList({ location, dispatch, dictTypeList }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = dictTypeList;

  const tableProps = {
    dataSource: dataSource,
    loading,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch({
        type: 'dictTypes/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onShowSizeChange(current, pageSize) {
      dispatch({
        type: 'dictTypes/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onView(id) {
      dispatch({
        type: 'dictTypes/gotoView',
        payload: id,
      });
    },
    onEdit(id) {
      dispatch({
        type: 'dictTypes/gotoEdit',
        payload: id,
      });
    },
    onDelete(id) {
      dispatch({
        type: 'dictTypeList/delete',
        payload: id,
      });
    },
    gotoChildList(id) {
      projectUtil.setCurMenuLink('/index/system_config/dict_manage/dicts');
      dispatch({
        type: 'dicts/gotoList',
        payload: {type_id: id},
      });
    },
    onChangeOrderBy(record, flag) {
      dispatch({
        type: 'dictTypeList/changeOrderBy',
        payload: {
          id: record.id,
          flag: flag,
        },
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'dictTypes/select',
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
function mapStateToProps({ dictTypeList }) {
  return { dictTypeList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
