import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Radio, Switch, Select, Icon } from 'antd';
import styles from '../../../../../../../styles/util/FormLayout.less';
import * as util from '../../../../../../../utils/tool/util.js';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = { labelCol: { span: 6, }, wrapperCol: { span: 14, }, };
const Option = Select.Option;
const { TextArea } = Input;

const CForm = ({
  item = [],
  mobileAppDataSource,
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
      data.status = data.status === true ? 'enabled' : 'disabled';
      onSubmit(data);
    });
  }

  let mobileAppOptions = mobileAppDataSource.map((item)=>{
    return <Option key={item.id}>{item.name}</Option>;
  });

  return (
    <div className={styles.formLayout}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <FormItem label="移动应用：" {...formItemLayout}>
          {getFieldDecorator('mobile_app_id', {
            initialValue: item.mobile_app_id === null || item.mobile_app_id === undefined || item.mobile_app_id === "" ? undefined : item.mobile_app_id + "",
            rules: [{ required: true, message: '请选择移动应用' },],
          })(<Select placeholder="请选择移动应用">{mobileAppOptions}</Select>)}
        </FormItem>
        <FormItem label="版本：" {...formItemLayout}>
          {getFieldDecorator('version', {
            initialValue: item.version,
            rules: [{ required: true, message: '请输入版本' },],
          })(<Input type="text" placeholder="请输入版本" maxLength="50"/>)}
        </FormItem>
        <FormItem label="是否强制更新：" {...formItemLayout}>
          {getFieldDecorator('forced_update_flag', {
            valuePropName: 'checked',
            initialValue: item.forced_update_flag !== null && item.forced_update_flag !== undefined && item.forced_update_flag === 'true',
          })(<Switch checkedChildren={'是'} unCheckedChildren={'否'}/>)}
        </FormItem>
        <FormItem label="下载链接：" {...formItemLayout}>
          {getFieldDecorator('download_url', {
            initialValue: item.download_url,
            rules: [{ required: true, message: '请输入下载链接' },],
          })(<Input type="text" placeholder="请输入下载链接" maxLength="200"/>)}
        </FormItem>
        <FormItem label="文件大小：" {...formItemLayout}>
          {getFieldDecorator('file_size', {
            initialValue: item.file_size,
            rules: [{ required: false, message: '请输入文件大小' },],
          })(<Input type="text" placeholder="请输入文件大小" maxLength="50"/>)}
        </FormItem>
        <FormItem label="类别：" {...formItemLayout}>
          {getFieldDecorator('type', {
            initialValue: item.type,
          })(<RadioGroup>
            <Radio value="iOS"><Icon type="apple" style={{'color': 'green', fontSize: 20}} /></Radio>
            <Radio value="Android"><Icon type="android" style={{'color': 'green', fontSize: 20}} /></Radio>
          </RadioGroup>)}
        </FormItem>
        <Form.Item label="版本更新说明：" {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark,
            rules: [{ required: false, message: '请输入版本更新说明' },],
          })(<TextArea rows={4} placeholder="请输入版本更新说明" maxLength="100"/>)}
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
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(CForm);
