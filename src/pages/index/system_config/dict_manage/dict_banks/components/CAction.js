import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Popconfirm } from 'antd';

const CAction = ({
  gotoAdd,
  gotoDeleteBatch,
}) => {
  function onConfirmHandler() {
    gotoDeleteBatch();
  }
  return (
    <Button.Group>
      <Button type="primary" onClick={gotoAdd}><Icon type="plus"/>新增&nbsp;&nbsp;&nbsp;</Button>
      <Popconfirm title="确定要删除所有选中的节点及其子节点吗？" onConfirm={() => onConfirmHandler()}>
        <Button type="ghost"><Icon type="delete"/>批量删除</Button>
      </Popconfirm>
    </Button.Group>
  );
};

CAction.propTypes = {
  onAdd: PropTypes.func,
  onDeleteBatch: PropTypes.func,
};

export default CAction;