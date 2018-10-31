import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Form, Input, Button, } from 'antd';
import styles from '../../../../../styles/util/SearchLayout.less';

const CSearch = ({
  curItemKey,
  itemArray,
  name,
  onTabClick,
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

  let showTabs = itemArray.map((item)=>{
    return <Tabs.TabPane tab={item.name} key={item.id}>&nbsp;</Tabs.TabPane>
  });
  return(
    <div className={styles.searchLayout}>
      <div className={styles.leftDiv}>
        <Tabs onTabClick={onTabClick} activeKey={curItemKey} type="card" style={{height:31}}>
          {showTabs}
        </Tabs>
      </div>
      <div className={styles.rightDiv}>
        <Form layout="inline" onSubmit={handleSubmit} style={{ marginLeft: '50px' }}>
          <Form.Item label="名称：" hasFeedback>
            {getFieldDecorator('name', {
              initialValue: name || '',
            })(<Input type="text" placeholder="请输入名称" maxLength="50" />)}
          </Form.Item>
          <Button style={{ marginRight: '10px' }} type="primary" htmlType="submit">查询</Button>
        </Form>
      </div>
    </div>
  );
};

CSearch.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  name: PropTypes.string,
};

export default Form.create()(CSearch);
