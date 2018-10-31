import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, Button, Radio, Switch } from 'antd';
import styles from '../../../../../../../../styles/util/FormLayout.less';
import * as util from '../../../../../../../../utils/tool/util.js';

const formItemLayout = { labelCol: { span: 6, }, wrapperCol: { span: 14, }, };
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const CForm = ({
  item = [],
  onSubmit,
  onCancel,
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
      let data = { ...getFieldsValue(), id: item.id };
      data = util.dealData(data);
      data.status = data.status === true ? "enabled" : "disabled";
      onSubmit(data);
    });
  }
  return (
    <div className={styles.formLayout}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <FormItem label="名称：" {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [{ required: true, message: '请输入名称' },],
          })(<Input type="text" placeholder="请输入名称" maxLength="30"/>)}
        </FormItem>
        <FormItem label="代码：" {...formItemLayout}>
          {getFieldDecorator('code', {
            initialValue: item.code,
            rules: [{ required: true, message: '请输入代码' },],
          })(<Input type="text" placeholder="请输入代码" maxLength="30"/>)}
        </FormItem>
        <FormItem label="单笔限额：" {...formItemLayout}>
          {getFieldDecorator('single_limit', {
            initialValue: item.single_limit,
            rules: [{ required: true, message: '请输入单笔限额' },],
          })(<InputNumber/>)}
        </FormItem>
        <FormItem label="单日限额：" {...formItemLayout}>
          {getFieldDecorator('single_day_limit', {
            initialValue: item.single_day_limit,
            rules: [{ required: true, message: '请输入单日限额' },],
          })(<InputNumber/>)}
        </FormItem>
        <FormItem label="单月限额：" {...formItemLayout}>
          {getFieldDecorator('single_month_limit', {
            initialValue: item.single_month_limit,
            rules: [{ required: true, message: '请输入单月限额' },],
          })(<InputNumber/>)}
        </FormItem>
        <FormItem label="标识：" {...formItemLayout}>
          {getFieldDecorator('flag', {
            initialValue: item.flag === null || item.flag === undefined || item.flag === '' ?  'b2c' : item.flag,
          })(<RadioGroup>
            <Radio value="quick">快捷卡</Radio>
            <Radio value="b2b">网银B2B</Radio>
            <Radio value="b2c">网银B2C</Radio>
          </RadioGroup>)}
        </FormItem>
        <FormItem label="状态：" {...formItemLayout}>
          {getFieldDecorator('status', {
            valuePropName: 'checked',
            initialValue: item.status !== null && item.status !== undefined && item.status === 'enabled',
          })(<Switch checkedChildren={'启用'} unCheckedChildren={'禁用'}/>)}
        </FormItem>
        <FormItem wrapperCol={{ span: 18, offset: 6 }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>保存</Button>
          <Button onClick={onCancel}>取消</Button>
        </FormItem>
      </Form>
    </div>
  );
};

CForm.propTypes = {
  visible: PropTypes.any,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(CForm);
