import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import CTree from './components/CTree';

function RList({ location, dispatch, cityAndCountyList }) {
  const { loading, dataSource } = cityAndCountyList;

  const treeProps = {
    loading,
    dataSource,
    onView(id) {
      dispatch({
        type: 'citiesAndCounties/gotoView',
        payload: id,
      });
    },
    onEdit(id) {
      dispatch({
        type: 'citiesAndCounties/gotoEdit',
        payload: id,
      });
    },
    onAddChild(item) {
      let id = item.id;
      dispatch(routerRedux.push({
        pathname: 'index/system_config/area_manage/cities_and_counties/add?parent_id=' + id,
      }));
    },
    onDelete(id) {
      dispatch({
        type: 'cityAndCountyList/delete',
        payload: id,
      });
    },
    onChangeOrderBy(record, flag) {
      dispatch({
        type: 'cityAndCountyList/changeOrderBy',
        payload: {
          id: record.key,
          flag: flag,
        },
      });
    },
    onSelect(selectedRowKeys) {
      dispatch({
        type: 'citiesAndCounties/select',
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
function mapStateToProps({ cityAndCountyList }) {
  return { cityAndCountyList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
