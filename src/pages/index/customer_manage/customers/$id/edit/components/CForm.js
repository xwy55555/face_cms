import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Radio, Switch, Select } from 'antd';
import styles from '../../../../../../../styles/util/FormLayout.less';
import * as util from '../../../../../../../utils/tool/util.js';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const Option = Select.Option;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = { labelCol: { span: 6, }, wrapperCol: { span: 14, }, };

const CForm = ({
  item = [],
  groupDataSource,
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
      data.birthday = data.birthday === '' ? '' : data.birthday.format('YYYY-MM-DD');
      data.status = data.status === true ? 'enabled' : 'disabled';
      onSubmit(data);
    });
  }

  let groupOptions = groupDataSource.map((item)=>{
    return <Option key={item.id}>{item.name}</Option>;
  });

  return (
    <div className={styles.formLayout}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Form.Item label="分组：" {...formItemLayout}>
          {getFieldDecorator('group_id', {
            initialValue: item.group_id === null || item.group_id === undefined || item.group_id === "" ? undefined : item.group_id + "",
            rules: [{ required: true, message: '请选择分组' },],
          })(<Select placeholder="请选择分组">{groupOptions}</Select>)}
        </Form.Item>
        <FormItem label="姓名：" {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [{ required: true, message: '请输入姓名' },],
          })(<Input type="text" placeholder="请输入姓名" maxLength="30"/>)}
        </FormItem>
        <FormItem label="手机：" {...formItemLayout}>
          {getFieldDecorator('mobile', {
            initialValue: item.mobile,
            rules: [{ required: true, message: '请输入手机' },],
          })(<Input type="text" placeholder="请输入手机" maxLength="11"/>)}
        </FormItem>
        <FormItem label="邮箱：" {...formItemLayout}>
          {getFieldDecorator('email', {
            initialValue: item.email,
            rules: [{ required: false, message: '请输入邮箱' },],
          })(<Input type="text" placeholder="请输入邮箱" maxLength="50"/>)}
        </FormItem>
        <FormItem label="生日：" {...formItemLayout}>
          {getFieldDecorator('birthday', {
            initialValue: item.birthday === null || item.birthday === undefined || item.birthday === '' ? undefined : moment(item.birthday, 'YYYY-MM-DD'),
            rules: [{ type: 'object', required: false, message: '请选择出生日期' },],
          })(<DatePicker />)}
        </FormItem>
        <FormItem label="性别：" {...formItemLayout}>
          {getFieldDecorator('sex', {
            initialValue: item.sex === null || item.sex === undefined || item.sex === '' ? 'secret' : item.sex,
          })(<RadioGroup>
              <Radio value="secret">保密</Radio>
              <Radio value="male">男</Radio>
              <Radio value="female">女</Radio>
            </RadioGroup>)}
        </FormItem>
        <FormItem label="备注：" {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark,
            rules: [{ required: false, message: '请输入备注' },],
          })(<Input type="textarea" placeholder="请输入备注" maxLength="50"/>)}
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
