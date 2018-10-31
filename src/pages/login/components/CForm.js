import React from 'react';
import { Form, Input, Button, Checkbox, Icon } from 'antd';
import styles from '../index.less';

const CForm = ({
  loading = false,
  onLogin,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((errors) => {
      if (!!errors) {
        return;
      }
      onLogin(getFieldsValue());
    });
  }
  return (
    <Form onSubmit={handleSubmit} className={styles.loginForm}>
      <Form.Item>
        {getFieldDecorator('account', {
          rules: [{ required: true, message: '请输入帐号' }],
        })(<Input prefix={<Icon type="user" />} placeholder="请输入帐号" maxLength="50" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: '请输入密码' }],
        })(<Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码" maxLength="50" />)}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className={styles.btLogin} loading={loading}>登录</Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create()(CForm);
