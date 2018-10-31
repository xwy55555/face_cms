import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Switch } from 'antd';
import styles from '../../../../../../../../styles/util/FormLayout.less';
import * as util from '../../../../../../../../utils/tool/util.js';
import * as get from '../../../../../../../../utils/tool/get';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const formItemLayout = { labelCol: { span: 6, }, wrapperCol: { span: 14, }, };
const FormItem = Form.Item;

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
      data.begin_dt = data.begin_dt === null || data.begin_dt === undefined  ?  '' : data.begin_dt.format('YYYY-MM-DD HH:mm:ss');
      data.end_dt = data.end_dt === null || data.end_dt === undefined  ? '' : data.end_dt.format('YYYY-MM-DD HH:mm:ss');
      data.status = data.status === true ? 'enabled' : 'disabled';
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
        <FormItem label="回调链接：" {...formItemLayout}>
          {getFieldDecorator('callback_url', {
            initialValue: item.callback_url,
            rules: [{ required: true, message: '请输入回调链接' },],
          })(<Input type="textarea" placeholder="请输入回调链接" maxLength="200"/>)}
        </FormItem>
        <FormItem label="正则表达式：" {...formItemLayout}  extra="Cron表达式包括以下 7 个字段：【秒】【分】【小时】【月内日期】【月】【周内日期】【年(可选)】【特殊字符】">
          {getFieldDecorator('cron_expression', {
            initialValue: item.cron_expression,
            rules: [{ required: true, message: '请输入正则表达式' },],
          })(<Input type="text" placeholder="请输入正则表达式" maxLength="50"/>)}
        </FormItem>
        <FormItem label="备注：" {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark,
            rules: [{ required: false, message: '请输入备注' },],
          })(<Input type="textarea" placeholder="请输入备注" maxLength="50"/>)}
        </FormItem>
        <Form.Item label="起始日期：" {...formItemLayout}>
          {getFieldDecorator('begin_dt', {
            initialValue: item.begin_dt === null || item.begin_dt === undefined ? moment(get.getDate(+1) + " 00:00:00", "YYYY-MM-DD HH:mm:ss") : moment(item.begin_date_time, "YYYY-MM-DD HH:mm:ss"),
            rules: [{ type: 'object', required: true, message: '请选择起始日期' },],
          })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>)}
        </Form.Item>
        <Form.Item label="截止日期：" {...formItemLayout} extra="为空时，表示永久有效">
          {getFieldDecorator('end_dt', {
            initialValue: item.end_dt === null || item.end_dt === undefined ? undefined : moment(item.end_date_time, "YYYY-MM-DD HH:mm:ss"),
            rules: [{ type: 'object', required: false, message: '请选择截止日期' },],
          })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
        </Form.Item>
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
