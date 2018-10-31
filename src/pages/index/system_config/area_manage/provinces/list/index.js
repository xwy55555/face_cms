import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTree from './components/CTree';
import * as projectUtil from "../../../../../../utils/rbacProjectUtil";

function RList({ location, dispatch, provinceList }) {
  const { loading, dataSource } = provinceList;

  const treeProps = {
    loading,
    dataSource,
    onView(id) {
      dispatch({
        type: 'provinces/gotoView',
        payload: id,
      });
    },
    onEdit(id) {
      dispatch({
        type: 'provinces/gotoEdit',
        payload: id,
      });
    },
    onDelete(id) {
      dispatch({
        type: 'provinceList/delete',
        payload: id,
      });
    },
    gotoChildList(id) {
      projectUtil.setCurMenuLink('/index/system_config/area_manage/cities_and_counties');
      dispatch({
        type: 'citiesAndCounties/gotoList',
        payload: {parent_id: id},
      });
    },
    onChangeOrderBy(record, flag) {
      dispatch({
        type: 'provinceList/changeOrderBy',
        payload: {
          id: record.key,
          flag: flag,
        },
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'provinces/select',
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
function mapStateToProps({ provinceList }) {
  return { provinceList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
