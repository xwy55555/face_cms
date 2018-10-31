import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Select, } from 'antd';
import styles from '../../../../../../styles/util/SearchLayout.less';

const Option = Select.Option;

const CSearch = ({
  carouselDataSource,
  curCarouselID,
  title,
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
  let carouselOptions = carouselDataSource.map((item)=>{
    return <Option key={item.id}>{item.name}</Option>;
  });
  return(
    <div className={styles.searchLayout}>
      <Form layout="inline" onSubmit={handleSubmit}>
        <Form.Item label="请选择轮播图：">
          {getFieldDecorator('carousel_id', {
            initialValue: curCarouselID === null || curCarouselID === undefined || curCarouselID === "" ? undefined : curCarouselID + "",
            rules: [{ required: false, message: '请选择轮播图' },],
          })(<Select placeholder="请选择轮播图" style={{ width: 300 }}>{carouselOptions}</Select>)}
        </Form.Item>
        <Form.Item label="轮播页标题：" hasFeedback>
          {getFieldDecorator('title', {
            initialValue: title || '',
          })(<Input type="text" placeholder="请输入轮播页标题" maxLength="50" />)}
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
