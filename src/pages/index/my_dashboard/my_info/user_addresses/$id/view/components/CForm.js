import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Cascader, Checkbox } from 'antd';
import styles from '../../../../../../../../styles/util/FormLayout.less';

const formItemLayout = { labelCol: { span: 6, }, wrapperCol: { span: 14, }, };

const CForm = ({
  item = [],
  gotoEdit,
  gotoList,
}) => {
  return (
    <div className={styles.formLayout}>
      <Form layout="horizontal">
        <Form.Item label="收件人：" {...formItemLayout}>
          <div className={styles.divView}>{item.recipient}</div>
        </Form.Item>
        <Form.Item label="手机号码：" {...formItemLayout}>
          <div className={styles.divView}>{item.mobile}</div>
        </Form.Item>
        <Form.Item label="省/市/区/县：" {...formItemLayout}>
          <div className={styles.divView}>{item.area_names}</div>
        </Form.Item>
        <Form.Item label="详细地址：" {...formItemLayout}>
          <div className={styles.divView}>{item.address}</div>
        </Form.Item>
        <Form.Item label="邮政编码：" {...formItemLayout}>
          <div className={styles.divView}>{item.postcode}</div>
        </Form.Item>
        <Form.Item label="默认地址:" {...formItemLayout}>
          <div className={styles.divView}>{(item.default_flag === null || item.default_flag === undefined || item.default_flag !== 'true') ? '' : '√'}</div>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
          <Button onClick={()=> gotoEdit(item.id)} style={{ marginRight: 8 }}>编辑</Button>
          <Button onClick={gotoList}>返回</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

CForm.propTypes = {
  visible: PropTypes.any,
  gotoEdit: PropTypes.func,
  gotoList: PropTypes.func,
};

export default Form.create()(CForm);
