import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Select, } from 'antd';
import styles from '../../../../../../styles/util/SearchLayout.less';

const Option = Select.Option;

const CSearch = ({
  taskDataSource,
  curTaskID,
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
  let taskOptions = taskDataSource.map((item)=>{
    return <Option key={item.id}>{item.name}</Option>;
  });
  return(
    <div className={styles.searchLayout}>
      <Form layout="inline" onSubmit={handleSubmit}>
        <Form.Item label="定时任务：">
          {getFieldDecorator('task_id', {
            initialValue: curTaskID === null || curTaskID === undefined || curTaskID === "" ? undefined : curTaskID + "",
            rules: [{ required: false, message: '请选择定时任务' },],
          })(<Select placeholder="请选择定时任务" style={{ width: 300 }}>{taskOptions}</Select>)}
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
