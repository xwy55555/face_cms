import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Radio, Checkbox, Switch, Upload, Icon } from 'antd';
import styles from '../../../../../../../../styles/util/FormLayout.less';
import * as util from '../../../../../../../../utils/tool/util.js';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const formItemLayout = { labelCol: { span: 6, }, wrapperCol: { span: 14, }, };
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const clientOptions = ['网站', '微信', 'iOS', 'Android'];

const CForm = ({
  item = [],
  apiUrlUploadByByte,
  updateImagePathName,
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

  function imageHandler(record) {
    if (record && record.image_url !== null && record.image_url !== undefined) {
      return <img style={{height: 50, width: 50}} src={record.image_url}/>;
    } else {
      return "";
    }
  }

  /** 上传图片 */
  const uploadImageProps = {
    name: 'image',
    action: apiUrlUploadByByte,
    accept: 'image/*',
    withCredentials: false,
    multiple:false,
    onStart(file) {
      console.log('onStart', file, file.name);
    },
    onSuccess(ret) {
      console.log('onSuccess', ret);
      updateImagePathName(ret.data[0].newFilePathName);
    },
    onError(err) {
      console.log('onError', err);
    },
    beforeUpload(file, fileList) {
      console.log(file, fileList);
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('仅支持文件类型：image/*');
      }
      const isLt2M = file.size / 1024 / 1024 <= 2;
      if (!isLt2M) {
        message.error('文件大小不能 > 2M');
      }
      return isImage && isLt2M;
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`文件上传成功：${info.file.name}`);
        //alert(info.file.response[0].newFilePathName);
        updateImagePathName(info.file.response[0].newFilePathName);
      } else if (info.file.status === 'error') {
        message.error(`文件上传失败：${info.file.name}`);
      }
    },
  };
  return (
    <div className={styles.formLayout}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <FormItem label="广告图" {...formItemLayout}>
          {getFieldDecorator('image_path_name', {
            initialValue: item.image_path_name,
            rules: [{ required: true, message: '请上传图片文件，文件大小 < 2M' },],
          })(<Input type="hidden"/>)}
          <div>
            <div className={styles.leftDiv}>
              { imageHandler(item) }
            </div>
            <div className={styles.leftDiv} style={{ paddingLeft:10, width: 358 }}>
              <Upload {...uploadImageProps}>
                <Button type="ghost">
                  <Icon type="upload" /> 点击上传图片文件
                </Button>
              </Upload>
            </div>
          </div>
        </FormItem>
        <FormItem label="标题：" {...formItemLayout}>
          {getFieldDecorator('title', {
            initialValue: item.title,
            rules: [{ required: true, message: '请输入标题' },],
          })(<Input type="text" placeholder="请输入标题" maxLength="50"/>)}
        </FormItem>
        <FormItem label="开始日期时间：" {...formItemLayout}>
          {getFieldDecorator('begin_dt', {
            initialValue: item.begin_dt === null || item.begin_dt === undefined || item.begin_dt === '' ? undefined : moment(item.begin_date_time, 'YYYY-MM-DD HH:mm:ss'),
            rules: [{ type: 'object', required: false, message: '请选择开始日期时间' },],
          })(<DatePicker showTime format='YYYY-MM-DD HH:mm:ss'/>)}
        </FormItem>
        <FormItem label="截止日期时间：" {...formItemLayout}>
          {getFieldDecorator('end_dt', {
            initialValue: item.end_dt === null || item.end_dt === undefined || item.end_dt === '' ? undefined : moment(item.end_date_time, 'YYYY-MM-DD HH:mm:ss'),
            rules: [{ type: 'object', required: false, message: '请选择截止日期时间' },],
          })(<DatePicker showTime format='YYYY-MM-DD HH:mm:ss'/>)}
        </FormItem>
        <FormItem label="目标链接：" {...formItemLayout}>
          {getFieldDecorator('target_url', {
            initialValue: item.target_url,
            rules: [{ required: false, message: '请输入目标链接' },],
          })(<Input type="textarea" placeholder="请输入目标链接" maxLength="50"/>)}
        </FormItem>
        <FormItem label="适用终端：" {...formItemLayout}>
          {getFieldDecorator('client_types', {
            initialValue: item.client_types === null || item.client_types === undefined ? [] : item.client_types.split(','),
          })(<CheckboxGroup options={clientOptions}/>)}
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
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(CForm);
