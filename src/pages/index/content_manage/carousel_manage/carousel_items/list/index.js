import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTable from './components/CTable';

function RList({ dispatch, carouselItemList }) {
  const { loading, dataSource, total, pageSize, current, conditionName } = carouselItemList;

  const tableProps = {
    loading,
    dataSource,
    total,
    pageSize,
    current,
    onPageChange(pageNumber) {
      dispatch({
        type: 'carouselItems/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onShowSizeChange(current, pageSize) {
      dispatch({
        type: 'carouselItems/gotoList',
        payload: { page_number:pageNumber, page_size:pageSize, name:conditionName },
      });
    },
    onEnabled(id) {
      dispatch({
        type: 'carouselItemEdit/edit',
        payload: {id, status:'enabled'},
      });
    },
    onDisabled(id) {
      dispatch({
        type: 'carouselItemEdit/edit',
        payload: {id, status:'disabled'},
      });
    },
    onEdit(id) {
      dispatch(routerRedux.push({
        pathname: '/index/content_manage/carousel_manage/carousel_items/carousel_item/' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'carouselItemList/delete',
        payload: id,
      });
    },
    onChangeOrderBy(record, flag) {
      dispatch({
        type: 'carouselItemList/changeOrderBy',
        payload: {
          id: record.id,
          flag: flag,
        },
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'carouselItems/select',
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
function mapStateToProps({ carouselItemList }) {
  return { carouselItemList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
