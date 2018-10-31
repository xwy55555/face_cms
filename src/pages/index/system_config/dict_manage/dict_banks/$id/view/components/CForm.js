import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, Button, Radio, Switch } from 'antd';
import styles from '../../../../../../../../styles/util/FormLayout.less';

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
        <FormItem label="代码：" {...formItemLayout}>
          <div className={styles.divView}>{item.code}</div>
        </FormItem>
        <FormItem label="单笔限额：" {...formItemLayout}>
          <div className={styles.divView}>{item.single_limit}</div>
        </FormItem>
        <FormItem label="单日限额：" {...formItemLayout}>
          <div className={styles.divView}>{item.single_day_limit}</div>
        </FormItem>
        <FormItem label="单月限额：" {...formItemLayout}>
          <div className={styles.divView}>{item.single_month_limit}</div>
        </FormItem>
        <FormItem label="标识：" {...formItemLayout}>
          <div className={styles.divView}>{item.flag}</div>
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
