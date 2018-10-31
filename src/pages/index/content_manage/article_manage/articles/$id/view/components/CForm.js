import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Tag, Upload, Icon, message, } from 'antd';
import styles from '../../../../../../../../styles/util/FormLayout.less';
import * as util from '../../../../../../../../utils/tool/util.js';
import * as base64 from '../../../../../../../../utils/tool/base64';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const formItemLayout = { labelCol: { span: 6, }, wrapperCol: { span: 14, }, };
const FormItem = Form.Item;

const CForm = ({
  item = [],
  apiUrlUploadByByte,
  updateImagePathName,
  addTag,
  removeTag,
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
      let data = { ...getFieldsValue(), id: item.id, topic_id: item.topic_id };
      let content = UE.getEditor('content').getContent();
      if (content === undefined || content === null || content === '') {
        content = '';
      } else {
        content = base64.base64Encode(content);
      }
      data.content = content;
      data = util.dealData(data);
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

  function btAddTagClick() {
    document.getElementById("div_bt_add_tag").style.display = "none";
    document.getElementById("div_tag_input").style.display = "block";
  }

  /**
   * 标签处理器
   * @param tags
   * @returns {string}
   */
  function tagsHandler(tags) {
    let tagArray = tags === null || tags === undefined ? [] : tags.split(",");
    if (tagArray.length > 0) {
      return tagArray.map((tag, index) => {
        tag = tag === null || tag === undefined ? "" : util.trim(tag);
        if (tag !== "") {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable={true} afterClose={() => tagCloseHandler(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
        }
      });
    }
    return "";
  }

  /**
   * 移除指定标签
   * @param tag
   */
  function tagCloseHandler(tag) {
    removeTag(tag);
  }

  /** 新增标签 */
  function addTagHander() {
    let tag = util.trim(document.getElementById("tag_input").value);
    if (tag !== '') {
      let tags = item.tags;
      tags = tags === null || tags === undefined ? "" : util.trim(tags);
      tag = util.replaceAll(tag, "，", ",");
      if (tag.indexOf(",") > -1) {
        let tagArray = tag.split(",");
        tagArray.map((tag, index) => {
          tagHandler(tags, tag);
        });
      } else {
        tagHandler(tags, tag);
      }
      document.getElementById("tag_input").value = '';
      document.getElementById("div_bt_add_tag").style.display = "block";
      document.getElementById("div_tag_input").style.display = "none";
    }
  }

  /**
   * 单个标签处理器
   * @param tags
   * @param tag
   */
  function tagHandler(tags, tag) {
    tag = util.trim(tag);
    if (tag === "") {
      return;
    }
    if (tags.indexOf(tag) > -1) {
      message.warning('标签（' + tag + '）已存在，请检查');
    } else {
      addTag(tag);
    }
  }
  return (
    <div className={styles.formLayout}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <FormItem label="配图" {...formItemLayout}>
          {getFieldDecorator('image_path_name', {
            initialValue: item.image_path_name,
            rules: [{ required: false, message: '请上传图片文件，文件大小 < 2M' },],
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
          })(<Input type="text" placeholder="请输入名称" maxLength="30"/>)}
        </FormItem>
        <FormItem label="内容：" {...formItemLayout}>
          {getFieldDecorator('content', {
            initialValue: item.content === undefined || item.content == null || item.content === '' ? '' : base64.base64Decode(item.content),
            rules: [{ required: false, message: '请输入内容' },],
          })(<UEditor height="200"/>)}
        </FormItem>
        <FormItem label="标签" {...formItemLayout} >
          {getFieldDecorator('tags', {
            initialValue: item.tags,
            rules: [{ required: false, message: '请输入标签，多个标签逗号间隔' },],
          })(<Input type="hidden"/>)}
          <div>
            <div className={styles.leftDiv}>{ tagsHandler(item.tags) }</div>
            <div id="div_bt_add_tag" className={styles.leftDiv}>
              <Button id="bt_add_tag" size="small" type="dashed" style={{ borderColor: '#f50' }} onClick={btAddTagClick}>+ 新标签</Button>
            </div>
            <div id="div_tag_input" className={styles.leftDiv} style={{display: 'none' }}>
              <Input id="tag_input" type="text" size="small" maxLength="50" style={{ width: 200, marginTop:6 }}
                     placeholder="请输入标签，多个标签逗号间隔" onBlur={addTagHander} onPressEnter={addTagHander}/>
            </div>
          </div>
        </FormItem>
        <FormItem label="备注：" {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark,
            rules: [{ required: false, message: '请输入备注' },],
          })(<Input type="textarea" placeholder="请输入备注" maxLength="50"/>)}
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
