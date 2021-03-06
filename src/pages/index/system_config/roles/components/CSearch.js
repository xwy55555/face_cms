import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select, Icon } from 'antd';
import styles from '../../../../../styles/util/SearchLayout.less';

const CSearch = ({
  name,
  code,
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
        <Form.Item label="名称：" hasFeedback>
          {getFieldDecorator('name', {
            initialValue: name || '',
          })(<Input type="text" placeholder="请输入名称" maxLength="50" />)}
        </Form.Item>
        <Form.Item label="代码：" hasFeedback>
          {getFieldDecorator('code', {
            initialValue: code || '',
          })(<Input type="text" placeholder="请输入代码" maxLength="50" />)}
        </Form.Item>
        <Button style={{ marginRight: '10px' }} type="primary" htmlType="submit">查询</Button>
      </Form>
    </div>
  );
};

CSearch.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  name: PropTypes.string,
  code: PropTypes.string,
};

export default Form.create()(CSearch);
