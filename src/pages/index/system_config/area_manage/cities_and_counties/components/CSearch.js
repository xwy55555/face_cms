import React from 'react';
import { Tabs } from 'antd';

const CSearch = ({
  curItemKey,
  itemArray,
  onSearch,
}) =>{
  let showTabs = itemArray.map((item)=>{
    return <Tabs.TabPane tab={item.name} key={item.id}>&nbsp;</Tabs.TabPane>
  });
  return(
    <Tabs onTabClick={onSearch} activeKey={curItemKey} type="card" style={{height:41}}>
      {showTabs}
    </Tabs>
  );
};

CSearch.propTypes = {
};

export default CSearch;
