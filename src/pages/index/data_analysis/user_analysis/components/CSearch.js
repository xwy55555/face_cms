import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button,} from 'antd';
import styles from '../../../../../styles/util/SearchLayout.less';
import { DatePicker } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const CSearch = ({
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
        <Form.Item label="起始日期：">
          {getFieldDecorator('begin_dt', {
            initialValue: beginDT === null || beginDT === undefined ? undefined : moment(beginDT, "YYYY-MM-DD"),
            rules: [{ type: 'object', required: false, message: '请选择起始日期' },],
          })(<DatePicker />)}
        </Form.Item>
        <Form.Item label="截止日期：">
          {getFieldDecorator('end_dt', {
            initialValue: endDT === null || endDT === undefined ? undefined : moment(endDT, "YYYY-MM-DD"),
            rules: [{ type: 'object', required: false, message: '请选择截止日期' },],
          })(<DatePicker />)}
        </Form.Item>
        <Button style={{ marginRight: '10px' }} type="primary" htmlType="submit">分析</Button>
      </Form>
    </div>
  );
};

CSearch.propTypes = {
  onSearch: PropTypes.func,
  beginDT: PropTypes.string,
  endDT: PropTypes.string,
};

export default Form.create()(CSearch);
