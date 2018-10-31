import React from 'react';
import MainMenuBar from '../../../components/MainMenuBar';
import LogoutMenuBar from '../../../components/LogoutMenuBar';
import SideMenuBar from '../../../components/SideMenuBar';
import BreadcrumbBar from '../../../components/BreadcrumbBar';
import * as projectUtil from '../../../utils/rbacProjectUtil';
import styles from '../../../styles/Index.less';

function MyDashboard({ children }) {
  let curMenuLink = projectUtil.getCurMenuLink();
  let curMenus = projectUtil.initMenus(curMenuLink);

  const mainMenuBarProps = {
    curItemKey : curMenus.mainMenuKey + '',
    itemArray : curMenus.mainMenuArray,
  };

  const sideMenuBarProps = {
    curItemKey : curMenus.sideMenuKey + '',
    itemArray : curMenus.sideMenuArray,
  };

  const breadcrumbBarProps = {
    itemArray : curMenus.breadcrumbArray
  };

  const logoutMenuBarProps = {
    curUserName : projectUtil.getCurUserName(),
  };

  function getContentSize() {
    let clientHeight = document.documentElement.clientHeight;
    let contentHeight = document.getElementById("div_content").offsetHeight;
    if (contentHeight < clientHeight - 160) {
      document.getElementById("div_content").style.height = (clientHeight - 160) + "px";
    }
    document.getElementById("div_content").style.overflowY = 'auto';
  }
  setTimeout(getContentSize, 100);
  return (
    <div className={styles.indexLayout}>
      <div className={styles.header}>
        <div className={styles.wrapper}>
          <div className={styles.logo}><h1>{ projectUtil.getProjectName() }</h1></div>
          <div className={styles.mainMenuBar}><MainMenuBar {...mainMenuBarProps}/></div>
          <div className={styles.logoutMenuBar}><LogoutMenuBar {...logoutMenuBarProps}/></div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.breadcrumb}>
          <BreadcrumbBar {...breadcrumbBarProps}/>
        </div>
        <div className={styles.container}>
          <aside className={styles.sider}>
            <SideMenuBar {...sideMenuBarProps}/>
          </aside>
          <div id="div_content">
            { children }
          </div>
        </div>
        <div className={styles.footer}>{ projectUtil.getCopyright() }</div>
      </div>
    </div>
  );
}

export default MyDashboard;
