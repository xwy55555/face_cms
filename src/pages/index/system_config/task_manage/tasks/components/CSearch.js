import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button,} from 'antd';
import styles from '../../../../../../styles/util/SearchLayout.less';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const CSearch = ({
  name,
  beginDT,
  endDT,
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
      const data = { ...getFieldsValue()};
      data.begin_dt = data.begin_dt === null || data.begin_dt === undefined ? '' : data.begin_dt.format('YYYY-MM-DD');
      data.end_dt = data.end_dt === null || data.end_dt === undefined ? '' : data.end_dt.format('YYYY-MM-DD');
      onSearch(data);
    });
  }
  return(
    <div className={styles.searchLayout}>
      <Form layout="inline" onSubmit={handleSubmit}>
        <Form.Item label="名称：" hasFeedback>
          {getFieldDecorator('name', {
            initialValue: name || '',
          })(<Input type="text" placeholder="请输入名称" maxLength="30" style={{ width: 300 }}/>)}
        </Form.Item>
        <Form.Item label="起始日期：">
          {getFieldDecorator('begin_dt', {
            initialValue: beginDT === null || beginDT === '' || beginDT === undefined ? undefined : moment(beginDT, "YYYY-MM-DD"),
            rules: [{ type: 'object', required: false, message: '请选择起始日期' },],
          })(<DatePicker />)}
        </Form.Item>
        <Form.Item label="截止日期：">
          {getFieldDecorator('end_dt', {
            initialValue: endDT === null || endDT === '' || endDT === undefined ? undefined : moment(endDT, "YYYY-MM-DD"),
            rules: [{ type: 'object', required: false, message: '请选择截止日期' },],
          })(<DatePicker />)}
        </Form.Item>
        <Button style={{ marginRight: '10px' }} type="primary" htmlType="submit">查询</Button>
      </Form>
    </div>
  );
};

CSearch.propTypes = {
  onSearch: PropTypes.func,
  name: PropTypes.string,
  beginDT: PropTypes.string,
  endDT: PropTypes.string,
};

export default Form.create()(CSearch);
