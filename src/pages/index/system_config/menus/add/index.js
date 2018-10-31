import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CForm from './components/CForm';

function RAdd({ location, dispatch, menuAdd }) {
  const { curRecord, selectIconModalVisible, dataSource } = menuAdd;

  const formProps = {
    item: curRecord,
    dataSource: dataSource,
    selectIconModalVisible: selectIconModalVisible,
    onSubmit(data) {
      dispatch({
        type: 'menuAdd/add',
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
        type: 'menuAdd/showSelectIconModal',
      });
    },
    onOkSelectIconModal() {
      console.log("onOkSelectIconModal");
      dispatch({
        type: 'menuAdd/hideSelectIconModal',
      });
    },
    onCancelSelectIconModal() {
      dispatch({
        type: 'menuAdd/hideSelectIconModal',
      });
    },
    onItemClickSelectIconModal(type) {
      let item = curRecord;
      item.icon = type;
      //console.log("onItemClickSelectIconModal, item = " + item);
      dispatch({
        type: 'menuAdd/hideSelectIconModal',
        payload: item,
      });
    }
  };
  return (
    <CForm {...formProps} />
  );
}

RAdd.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ menuAdd }) {
  return { menuAdd };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RAdd);
