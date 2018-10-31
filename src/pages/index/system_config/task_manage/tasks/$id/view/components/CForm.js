import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Switch } from 'antd';
import styles from '../../../../../../../../styles/util/FormLayout.less';
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
        <FormItem label="名称：" {...formItemLayout}>
          <div className={styles.divView}>{item.name}</div>
        </FormItem>
        <FormItem label="回调链接：" {...formItemLayout}>
          <div className={styles.divView}>{item.callback_url}</div>
        </FormItem>
        <FormItem label="正则表达式：" {...formItemLayout}>
          <div className={styles.divView}>{item.cron_expression}</div>
        </FormItem>
        <FormItem label="备注：" {...formItemLayout}>
          <div className={styles.divView}>{item.remark}</div>
        </FormItem>
        <Form.Item label="起始日期：" {...formItemLayout}>
          <div className={styles.divView}>{item.begin_date_time}</div>
        </Form.Item>
        <Form.Item label="截止日期：" {...formItemLayout}>
          <div className={styles.divView}>{item.end_date_time}</div>
        </Form.Item>
        <FormItem label="状态：" {...formItemLayout}>
          <div className={styles.divView}>{item.status_name}</div>
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
