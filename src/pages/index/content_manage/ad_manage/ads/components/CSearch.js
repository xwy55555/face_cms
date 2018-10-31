import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select, Icon } from 'antd';
import styles from '../../../../../../styles/util/SearchLayout.less';

const Option = Select.Option;

const CSearch = ({
  adPositionDataSource,
  curAdPositionID,
  name,
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
  let adPositionOptions = adPositionDataSource.map((item)=>{
    return <Option key={item.id}>{item.name}</Option>;
  });
  return(
    <div className={styles.searchLayout}>
      <Form layout="inline" onSubmit={handleSubmit}>
        <Form.Item label="广告位：">
          {getFieldDecorator('ad_position_id', {
            initialValue: curAdPositionID === null || curAdPositionID === undefined || curAdPositionID === "" ? undefined : curAdPositionID + "",
            rules: [{ required: false, message: '请选择广告位' },],
          })(<Select placeholder="请选择广告位" style={{ width: 300 }}>{adPositionOptions}</Select>)}
        </Form.Item>
        <Form.Item label="广告名称：" hasFeedback>
          {getFieldDecorator('name', {
            initialValue: name || '',
          })(<Input type="text" placeholder="请输入广告名称" maxLength="30" />)}
        </Form.Item>
        <Button style={{ marginRight: '10px' }} type="primary" htmlType="submit">查询</Button>
      </Form>
    </div>
  );
};

CSearch.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
};

export default Form.create()(CSearch);
