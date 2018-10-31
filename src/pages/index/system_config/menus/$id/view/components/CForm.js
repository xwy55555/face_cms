import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Icon, Row, Col, TreeSelect } from 'antd';
import styles from '../../../../../../../styles/util/FormLayout.less';

const formItemLayout = { labelCol: { span: 6, }, wrapperCol: { span: 14, }, };

const CForm = ({
 item = [],
 gotoEdit,
 gotoList,
}) => {
  return (
    <div className={styles.formLayout}>
      <Form layout="horizontal">
        <Form.Item label="上级：" {...formItemLayout}>
          <div className={styles.divView}>{item.parent_name}</div>
        </Form.Item>
        <Form.Item label="名称：" {...formItemLayout}>
          <div className={styles.divView}>{item.name}</div>
        </Form.Item>
        <Form.Item label="链接：" {...formItemLayout}>
          <div className={styles.divView}>{item.link}</div>
        </Form.Item>
        <Form.Item label="图标：" {...formItemLayout}>
          <div className={styles.divView}><Icon type={item.icon} /></div>
        </Form.Item>
        <Form.Item label="备注：" {...formItemLayout}>
          <div className={styles.divView}>{item.remark}</div>
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
