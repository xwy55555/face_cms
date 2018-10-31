import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Popconfirm } from 'antd';

const CAction = ({
  gotoEdit,
}) => {
  return (
    <Button.Group>
      <Button type="primary" onClick={gotoEdit}><Icon type="upload"/>上传头像&nbsp;&nbsp;&nbsp;</Button>
    </Button.Group>
  );
};

CAction.propTypes = {
  gotoEdit: PropTypes.func,
};

export default CAction;
