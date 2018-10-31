import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import styles from '../../../../../styles/util/SearchLayout.less';

const CSearch = ({
  name,
  code,
  account,
  mobile,
  onSearch,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) =>{
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((errors) => {
      if (!!errors) {
        return;
      }
      onSearch(getFieldsValue());
    });
  }
  return(
    <div className={styles.searchLayout}>
      <Form layout="inline" onSubmit={handleSubmit}>
        <Form.Item label="姓名：" hasFeedback>
          {getFieldDecorator('name', {
            initialValue: name || '',
          })(<Input type="text" placeholder="请输入姓名" maxLength="50" />)}
        </Form.Item>
        <Form.Item label="帐号：" hasFeedback>
          {getFieldDecorator('account', {
            initialValue: account || '',
          })(<Input type="text" placeholder="请输入帐号" maxLength="50" />)}
        </Form.Item>
        <Form.Item label="手机号码：" hasFeedback>
          {getFieldDecorator('mobile', {
            initialValue: mobile || '',
          })(<Input type="text" placeholder="请输入手机号码" maxLength="11" />)}
        </Form.Item>
        <Form.Item label="工号：" hasFeedback>
          {getFieldDecorator('code', {
            initialValue: code || '',
          })(<Input type="text" placeholder="请输入工号" maxLength="50" />)}
        </Form.Item>
        <Button style={{ marginRight: '10px' }} type="primary" htmlType="submit">查询</Button>
      </Form>
    </div>
  );
};

CSearch.propTypes = {
  name: PropTypes.string,
  code: PropTypes.string,
  account: PropTypes.string,
  mobile: PropTypes.string,
};

export default Form.create()(CSearch);
