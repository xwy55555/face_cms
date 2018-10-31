import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Radio, Switch, Select } from 'antd';
import styles from '../../../../../../../styles/util/FormLayout.less';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const FormItem = Form.Item;
const formItemLayout = { labelCol: { span: 6, }, wrapperCol: { span: 14, }, };

const CForm = ({
  item = [],
  gotoEdit,
  gotoList,
}) => {
  return (
    <div className={styles.formLayout}>
      <Form layout="horizontal">
        <Form.Item label="分组：" {...formItemLayout}>
          <div className={styles.divView}>{item.group_name}</div>
        </Form.Item>
        <FormItem label="姓名：" {...formItemLayout}>
          <div className={styles.divView}>{item.name}</div>
        </FormItem>
        <FormItem label="手机：" {...formItemLayout}>
          <div className={styles.divView}>{item.mobile}</div>
        </FormItem>
        <FormItem label="邮箱：" {...formItemLayout}>
          <div className={styles.divView}>{item.email}</div>
        </FormItem>
        <FormItem label="生日：" {...formItemLayout}>
          <div className={styles.divView}>{item.birthday}</div>
        </FormItem>
        <FormItem label="性别：" {...formItemLayout}>
          <div className={styles.divView}>{item.sex_name}</div>
        </FormItem>
        <FormItem label="备注：" {...formItemLayout}>
          <div className={styles.divView}>{item.remark}</div>
        </FormItem>
        <FormItem label="状态：" {...formItemLayout}>
          <div className={styles.divView}>{item.status_name}</div>
        </FormItem>
        <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
          <Button onClick={()=> gotoEdit(item.id)} style={{ marginRight: 8 }}>编辑</Button>
          <Button onClick={()=> gotoList(item.group_id)}>返回</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

CForm.propTypes = {
  visible: PropTypes.any,
};

export default Form.create()(CForm);

