import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Form, Input, Button, } from 'antd';
import styles from '../../../../../../styles/util/SearchLayout.less';

const CSearch = ({
 curItemKey,
 itemArray,
 onTabClick,
 onSearch,
 form: {
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
    </div>
  );
};

CSearch.propTypes = {
  onSearch: PropTypes.func,
};

export default Form.create()(CSearch);
