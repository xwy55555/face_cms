import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Cascader, Checkbox } from 'antd';
import styles from '../../../../../../../styles/util/FormLayout.less';
import * as util from '../../../../../../../utils/tool/util.js';

const formItemLayout = { labelCol: { span: 6, }, wrapperCol: { span: 14, }, };
const tailFormItemLayout = { wrapperCol: { span: 14, offset: 6, }, };

const CForm = ({
  item = [],
  areaTreeDataSource,
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
      data.area_ids = data.area_ids.toString();
      onSubmit(data);
    });
  }
  function onChange(value) {
    console.log(value);
  }
  return (
    <div className={styles.formLayout}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Form.Item label="收件人：" {...formItemLayout} hasFeedback>
          {getFieldDecorator('recipient', {
            initialValue: item.recipient,
            rules: [{ required: true, message: '请输入收件人' },],
          })(<Input type="text" placeholder="请输入收件人" maxLength="30"/>)}
        </Form.Item>
        <Form.Item label="手机号码：" {...formItemLayout} hasFeedback>
          {getFieldDecorator('mobile', {
            initialValue: item.mobile,
            rules: [{ required: true, message: '请输入手机号码' },],
          })(<Input type="text" placeholder="请输入手机号码" maxLength="11"/>)}
        </Form.Item>
        <Form.Item label="省/市/区/县：" {...formItemLayout} hasFeedback>
          {getFieldDecorator('area_ids', {
            initialValue: item.area_ids === null || item.area_ids === undefined ? [] : item.area_ids.split(','),
            rules: [{ type: 'array', required: true, message: '请选择省/市/区/县' }],
          })(<Cascader options={areaTreeDataSource} onChange={onChange} placeholder="请选择省/市/区/县" />)}
        </Form.Item>
        <Form.Item label="详细地址：" {...formItemLayout} hasFeedback>
          {getFieldDecorator('address', {
            initialValue: item.address,
            rules: [{ required: true, message: '请输入详细地址' },],
          })(<Input type="textarea" placeholder="请输入详细地址" maxLength="100"/>)}
        </Form.Item>
        <Form.Item label="邮政编码：" {...formItemLayout} hasFeedback>
          {getFieldDecorator('postcode', {
            initialValue: item.postcode,
            rules: [{ required: true, message: '请输入邮政编码' },],
          })(<Input type="text" placeholder="请输入邮政编码" maxLength="6"/>)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout} style={{ marginBottom: 8 }}>
          {getFieldDecorator('default_flag', {
            valuePropName: 'checked',
            initialValue: !(item.default_flag === null || item.default_flag === undefined || item.default_flag !== 'true')
          })(
            <Checkbox>设为默认地址</Checkbox>
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>保存</Button>
          <Button onClick={onCancel}>取消</Button>
        </Form.Item>
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
