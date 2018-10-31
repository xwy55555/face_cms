import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTree from './components/CTree';

function RList({ location, dispatch, menuList }) {
  const { loading, dataSource } = menuList;

  const treeProps = {
    loading,
    dataSource,
    onView(id) {
      dispatch({
        type: 'menus/gotoView',
        payload: id,
      });
    },
    onEdit(id) {
      dispatch({
        type: 'menus/gotoEdit',
        payload: id,
      });
    },
    onAddChild(id) {
      dispatch({
        type: 'menus/gotoAdd',
        payload: id,
      });
    },
    onDelete(id) {
      dispatch({
        type: 'menuList/delete',
        payload: id,
      });
    },
    onChangeOrderBy(record, flag) {
      dispatch({
        type: 'menuList/changeOrderBy',
        payload: {
          id: record.key,
          flag: flag,
        },
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'menus/select',
        payload: selectedRowKeys,
      });
    }
  };

  return (
    <CTree {...treeProps}/>
  );
}

RList.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ menuList }) {
  return { menuList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
