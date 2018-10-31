import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Icon, Row, Col, message } from 'antd';
import styles from '../../../../../../../styles/util/FormLayout.less';
import * as util from '../../../../../../../utils/tool/util.js';

const formItemLayout = { labelCol: { span: 6, }, wrapperCol: { span: 14, }, };

const CForm = ({
  item = {},
  onSubmit,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    },
  }) => {
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((errors) => {
      if (errors) {
        return;
      }
      let data = { ...getFieldsValue() };
      data = util.dealData(data);
      if (data.new_password !== data.confirm_new_password) {
        message.warning('两次输入的新密码不一致，请检查');
        return;
      }
      onSubmit(data);
    });
  }
  return (
    <div className={styles.formLayout}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Form.Item label="当前密码：" {...formItemLayout}>
          {getFieldDecorator('cur_password', {
            rules: [{ required: true, message: '请输入当前密码' },],
          })(<Input type="password" placeholder="请输入当前密码" maxLength="30"/>)}
        </Form.Item>
        <Form.Item label="新密码：" {...formItemLayout}>
          {getFieldDecorator('new_password', {
            rules: [{ required: true, message: '请输入新密码' }],
          })(<Input type="password" placeholder="请输入新密码" maxLength="30" />)}
        </Form.Item>
        <Form.Item label="确认新密码：" {...formItemLayout}>
          {getFieldDecorator('confirm_new_password', {
            rules: [{ required: true, message: '请再次输入新密码' }],
          })(<Input type="password" placeholder="请再次输入新密码" maxLength="30"/>)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>保存</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

CForm.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(CForm);
