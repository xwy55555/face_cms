import React from 'react';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import styles from '../../styles/Index.less';

function Index({ children }) {
  return (
    <LocaleProvider locale={zh_CN}>
      <div className={styles.indexLayout}>
        {children}
      </div>
    </LocaleProvider>
  );
}

// 建立数据关联关系
export default Index;
