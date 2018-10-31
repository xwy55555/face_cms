import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function REdit({ location, dispatch, menuEdit }) {
  const { curRecord, selectIconModalVisible, dataSource } = menuEdit;

  const formProps = {
    item: curRecord,
    dataSource: dataSource,
    selectIconModalVisible: selectIconModalVisible,
    onSubmit(data) {
      dispatch({
        type: 'menuEdit/edit',
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'menus/gotoList',
      });
    },
    onSelectIcon() {
      dispatch({
        type: 'menuEdit/showSelectIconModal',
      });
    },
    onOkSelectIconModal() {
      console.log("onOkSelectIconModal");
      dispatch({
        type: 'menuEdit/hideSelectIconModal',
      });
    },
    onCancelSelectIconModal() {
      dispatch({
        type: 'menuEdit/hideSelectIconModal',
      });
    },
    onItemClickSelectIconModal(type) {
      let item = curRecord;
      item.icon = type;
      //console.log("onItemClickSelectIconModal, item = " + item);
      dispatch({
        type: 'menuEdit/hideSelectIconModal',
        payload: item,
      });
    }
  };
  return (
    <CForm {...formProps} />
  );
}

REdit.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ menuEdit }) {
  return { menuEdit };
}

// 建立数据关联关系
export default connect(mapStateToProps)(REdit);
