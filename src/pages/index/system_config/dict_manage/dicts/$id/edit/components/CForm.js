import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Icon, Row, Col, Select, } from 'antd';
import styles from '../../../../../../../../styles/util/FormLayout.less';
import * as util from '../../../../../../../../utils/tool/util.js';

const formItemLayout = { labelCol: { span: 6, }, wrapperCol: { span: 14, }, };

const CForm = ({
  item = [],
  typeDataSource,
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
      onSubmit(data);
    });
  }

  let typeOptions = typeDataSource.map((item)=>{
    return <Option key={item.id}>{item.name}</Option>;
  });

  return (
    <div className={styles.formLayout}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Form.Item label="类型：" {...formItemLayout}>
          {getFieldDecorator('type_id', {
            initialValue: item.type_id + "",
            rules: [{ required: true, message: '请选择类型' },],
          })(<Select placeholder="请选择类型">{typeOptions}</Select>)}
        </Form.Item>
        <Form.Item label="名称：" {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [{ required: true, message: '请输入名称' },],
          })(<Input type="text" placeholder="请输入名称" maxLength="30"/>)}
        </Form.Item>
        <Form.Item label="标识：" {...formItemLayout}>
          {getFieldDecorator('code', {
            initialValue: item.code,
            rules: [{ required: false, message: '请输入标识' },],
          })(<Input type="text" placeholder="请输入标识" maxLength="30"/>)}
        </Form.Item>
        <Form.Item label="备注：" {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark,
            rules: [{ required: false, message: '请输入备注' },],
          })(<Input type="textarea" placeholder="请输入备注" maxLength="100"/>)}
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
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(CForm);
