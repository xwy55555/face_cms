import React from 'react';
import { Tabs } from 'antd';
import styles from '../../../../../../styles/util/SearchLayout.less';

const CSearch = ({
  curItemKey,
  itemArray,
  onSearch,
}) =>{
  let showTabs = itemArray.map((item)=>{
    return <Tabs.TabPane tab={item.name} key={item.id}>&nbsp;</Tabs.TabPane>
  });
  return(
    <div className={styles.searchLayout}>
      <Tabs onTabClick={onSearch} activeKey={curItemKey} type="card" style={{height:41}}>{showTabs}</Tabs>
    </div>
  );
};

CSearch.propTypes = {
};

export default CSearch;
