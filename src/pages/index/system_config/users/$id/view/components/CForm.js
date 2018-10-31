import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Radio, Switch } from 'antd';
import styles from '../../../../../../../styles/util/FormLayout.less';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const formItemLayout = { labelCol: { span: 6, }, wrapperCol: { span: 14, }, };
const FormItem = Form.Item;

const CForm = ({
  item = [],
  gotoEdit,
  gotoList,
}) => {
  return (
    <div className={styles.formLayout}>
      <Form layout="horizontal">
        <FormItem label="姓名：" {...formItemLayout}>
          <div className={styles.divView}>{item.name}</div>
        </FormItem>
        <FormItem label="帐号：" {...formItemLayout}>
          <div className={styles.divView}>{item.account}</div>
        </FormItem>
        <FormItem label="手机：" {...formItemLayout}>
          <div className={styles.divView}>{item.mobile}</div>
        </FormItem>
        <FormItem label="工号：" {...formItemLayout}>
          <div className={styles.divView}>{item.code}</div>
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
          <div className={styles.divView}>{item.status}</div>
        </FormItem>
        <FormItem wrapperCol={{ span: 18, offset: 6 }}>
          <Button onClick={()=> gotoEdit(item.id)} style={{ marginRight: 8 }}>编辑</Button>
          <Button onClick={gotoList}>返回</Button>
        </FormItem>
      </Form>
    </div>
  );
};

CForm.propTypes = {
  visible: PropTypes.any,
};

export default Form.create()(CForm);
