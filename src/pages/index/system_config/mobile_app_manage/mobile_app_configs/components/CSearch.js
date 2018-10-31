import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select, Icon } from 'antd';
import styles from '../../../../../../styles/util/SearchLayout.less';

const Option = Select.Option;

const CSearch = ({
  mobileAppDataSource,
  curMobileAppID,
  onSearch,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) =>{
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((errors) => {
      if (!!errors) {
        return;
      }
      onSearch(getFieldsValue());
    });
  }
  let mobileAppOptions = mobileAppDataSource.map((item)=>{
    return <Option key={item.id}>{item.name}</Option>;
  });
  return(
    <div className={styles.searchLayout}>
      <Form layout="inline" onSubmit={handleSubmit}>
        <Form.Item label="移动应用：">
          {getFieldDecorator('mobile_app_id', {
            initialValue: curMobileAppID === null || curMobileAppID === undefined || curMobileAppID === "" ? undefined : curMobileAppID + "",
            rules: [{ required: false, message: '请选择移动应用' },],
          })(<Select placeholder="请选择移动应用" style={{ width: 300 }}>{mobileAppOptions}</Select>)}
        </Form.Item>
        <Button style={{ marginRight: '10px' }} type="primary" htmlType="submit">查询</Button>
      </Form>
    </div>
  );
};

CSearch.propTypes = {
  onSearch: PropTypes.func,
};

export default Form.create()(CSearch);
