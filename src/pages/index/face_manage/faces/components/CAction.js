import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Popconfirm } from 'antd';

const CAction = ({
  gotoDeleteBatch,
}) => {
  function onConfirmHandler() {
      gotoDeleteBatch();
  }
  return (
    <Button.Group>
      <Popconfirm title="确定要删除所有选中的记录吗？" onConfirm={() => onConfirmHandler()}>
        <Button type="ghost"><Icon type="delete"/>批量删除</Button>
      </Popconfirm>
    </Button.Group>
  );
};

CAction.propTypes = {
  onDeleteBatch: PropTypes.func,
};

export default CAction;
