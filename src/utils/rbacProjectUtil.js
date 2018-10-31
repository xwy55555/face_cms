import * as projectConstant from './rbacProjectConstant'
import * as util from './tool/util';
import * as md5 from './tool/md5';

let cryptoJS = require('crypto-js');
let jwtDecode = require('jwt-decode');

/**
 * 从paylaod中取指定key对应的值
 * @param payload
 * @param key
 */
export function getValueFromPayload(payload, key) {
  if (payload === null || payload === undefined || typeof target !== "object") {
    return "";
  }
  let resultValue = payload[key];
  return resultValue === undefined ? "" : resultValue;
}

/**
 * 动态添加脚本到html文件中
 * @param url
 * @param callback
 */
export function dynamicAddScriptToHtml(url, callback) {
  const e = document.createElement('script');
  e.type = 'text/javascript';
  e.async = true;
  e.src = url;
  /* IE6/7/8                -- onreadystatechange
   * IE9/10                 -- onreadystatechange, onload
   * Firefox/Chrome/Opera   -- onload */
  const isIE = !-[1,];
  if (isIE) {
    // 判断IE8及以下浏览器
    e.onreadystatechange = function () {
      if (this.readyState === 'loaded' || this.readyState === 'complete') {
        callback();
      }
    }
  } else {
    // IE9及以上浏览器，Firefox，Chrome，Opera
    e.onload = function () {
      callback();
    }
  }
  document.body.appendChild(e);
}

/**
 * Hex编码
 * @param input
 * @returns {string}
 */
export function hexEncode(input){
  return cryptoJS.enc.Utf8.parse(input).toString(cryptoJS.enc.Hex);
}

/**
 * 密码加密
 * @param input
 * @returns {string}
 */
export function passwordEncrypt(input){
  return hexEncode(md5.hex_md5(input));
}

/** 得到Token */
export function getToken() {
  // 从缓存中取出Token
  return sessionStorage.getItem(projectConstant.KEY_TOKEN);
}

/** 解析Token */
export function parseToken() {
  // 从缓存中取出Token
  let token = getToken();
  // 解析jwt
  return token === null ? null : jwtDecode(token);
}

/** 得到当前用户姓名 */
export function getCurUserName() {
  let curUser = parseToken();
  if (curUser === null || curUser === undefined) {
    return null;
  } else {
    return curUser.name === null || curUser.name === undefined ? "" : util.trim(curUser.name);
  }
}

/** 得到当前用户帐号 */
export function getCurUserAccout() {
  let curUser = parseToken();
  if (curUser === null || curUser === undefined) {
    return null;
  } else {
    return curUser.account === null || curUser.account === undefined ? "" : util.trim(curUser.account);
  }
}

/** 得到当前用户的手机号码 */
export function getCurUserMobile() {
  let curUser = parseToken();
  if (curUser === null || curUser === undefined) {
    return null;
  } else {
    return curUser.mobile === null || curUser.mobile === undefined ? "" : util.trim(curUser.mobile);
  }
}

/**
 * 菜单鉴权
 * @param menuLink
 * @returns {boolean}
 */
export function authMap(menuLink) {
  let resultValue = false;
  let menuMap = getMenuMap();
  if (menuMap !== null && menuMap !== undefined) {
    for (let link in menuMap) {
      if ('' !== link && menuLink.startsWith(link)) {
        resultValue = true;
        break;
      }
    }
  }
  return resultValue;
}

/** 得到工程配置参数 */
export function getProjectInfo() {
  return JSON.parse(sessionStorage.getItem(projectConstant.KEY_PROJECT_INFO));
}

/**
 * 设置工程配置参数
 * @param data
 */
export function setProjectInfo(data) {
  sessionStorage.removeItem(projectConstant.KEY_PROJECT_INFO);
  sessionStorage.setItem(projectConstant.KEY_PROJECT_INFO, JSON.stringify(data));
}

/** 得到项目名称 */
export function getProjectName() {
  let projectInfo = getProjectInfo();
  if (projectInfo === null || projectInfo === undefined || projectInfo === []) {
    return '';
  } else {
    return util.trim(projectInfo.project_name);
  }
}

/** 得到项目代码 */
export function getProjectCode() {
  let projectInfo = getProjectInfo();
  if (projectInfo === null || projectInfo === undefined || projectInfo === []) {
    return '';
  } else {
    return util.trim(projectInfo.project_code);
  }
}

/** 得到公司名称 */
export function getCompanyName() {
  let projectInfo = getProjectInfo();
  if (projectInfo === null || projectInfo === undefined || projectInfo === []) {
    return '';
  } else {
    return util.trim(projectInfo.company_name);
  }
}

/** 得到版权声明 */
export function getCopyright() {
  let projectInfo = getProjectInfo();
  if (projectInfo === null || projectInfo === undefined || projectInfo === []) {
    return '';
  } else {
    return util.trim(projectInfo.copyright);
  }
}

/**
 * 根据链接得到当前选中的主菜单项、面包屑导航和侧边菜单项
 * @param menuLink
 * @returns {*}
 */
export function initMenus(menuLink) {
  // console.log('menuLink:', menuLink);
  // 当前选中的菜单项标识：主菜单（main_menu）、侧边菜单（side_menu）
  menuLink = menuLink === null || menuLink === undefined ? "" : menuLink;
  let curMenuFlag = '';
  let mainMenu = getCurMainMenu(menuLink);
  if (mainMenu === null) {
    curMenuFlag = 'side_menu';
  } else {
    curMenuFlag = 'main_menu';
  }
  let sideMenus = getCurSideMenus(mainMenu, menuLink);
  if (mainMenu === null) {
    mainMenu = getCurMainMenuBySideMenu(sideMenus.two)
  }
  // 面包屑导航
  let breadcrumbArray = [];
  breadcrumbArray.push(mainMenu);
  breadcrumbArray.push(sideMenus.two);
  if (sideMenus.three === null || sideMenus.three === undefined) {
    //没有三级菜单
  } else {
    breadcrumbArray.push(sideMenus.three);
  }
  //console.log('curMenuFlag:', curMenuFlag);
  //console.log('mainMenu:', mainMenu);
  //console.log('sideMenus:', sideMenus);
  return {
    curMenuFlag: curMenuFlag,
    mainMenuArray: getMainMenuArray(),
    mainMenu: mainMenu,
    mainMenuKey: mainMenu.id + "",
    sideMenuArray: getSideMenuArray(mainMenu),
    sideMenu: sideMenus.three === null || sideMenus.three === undefined ? sideMenus.two : sideMenus.three,
    sideMenuKey: sideMenus.three === null || sideMenus.three === undefined ? sideMenus.two.id + "" : sideMenus.three.id + "",
    breadcrumbArray: breadcrumbArray
  };
}

/**
 * 设置当前菜单链接
 * @param menuLink
 */
export function setCurMenuLink(menuLink) {
  let resultValue = menuLink;
  //console.log('menuLink:', menuLink);
  let mainMenu = getCurMainMenu(menuLink);
  let sideMenus = getCurSideMenus(mainMenu, menuLink);
  if (sideMenus.three !== null && sideMenus.three !== undefined) {
    resultValue = sideMenus.three.link;
    sessionStorage.removeItem(projectConstant.KEY_CUR_MENU_LINK);
    sessionStorage.setItem(projectConstant.KEY_CUR_MENU_LINK, resultValue);
  } else if (sideMenus.two !== null && sideMenus.two !== undefined) {
    resultValue = sideMenus.two.link;
    sessionStorage.removeItem(projectConstant.KEY_CUR_MENU_LINK);
    sessionStorage.setItem(projectConstant.KEY_CUR_MENU_LINK, resultValue);
  }
  return resultValue;
}

/**
 * 得到当前菜单链接
 * @returns {*}
 */
export function getCurMenuLink() {
  return sessionStorage.getItem(projectConstant.KEY_CUR_MENU_LINK);
}

/**
 * 得到当前菜单名称
 * @returns {*}
 */
export function getCurMenuName() {
  let curMenu = getCurMenu();
  return curMenu === null || curMenu === undefined ? "" : curMenu.name;
}

/**
 * 得到当前选中的菜单项
 * @returns {*}
 */
export function getCurMenu() {
  let curMenuLink = getCurMenuLink();
  //console.log('curMenuLink:', curMenuLink);
  let mainMenu = getCurMainMenu(curMenuLink);
  if (mainMenu === null) {
    //主菜单里没找到，说明当前菜单是二级或三级菜单
    let sideMenus = getCurSideMenus(null, curMenuLink);
    if (sideMenus) {
      if (sideMenus.three === null || sideMenus.three === undefined) {
        //没有三级菜单，则返回二级菜单
        return sideMenus.two;
      } else {
        return sideMenus.three;
      }
    }
  } else {
    return mainMenu;
  }
}

/** 得到当前用户有权限操作的主菜单列表 */
export function getMainMenuArray() {
  // 从缓存中取出主菜单
  let resultValue = JSON.parse(sessionStorage.getItem(projectConstant.KEY_MAIN_MENU_S));
  //console.log('mainMenuArray:', JSON.stringify(resultValue));
  return resultValue;
}

/** 得到当前用户有权限操作的侧边菜单集合：[{mainMenuKey, sideMenuArray}] */
function getSideMenusMap() {
  // 从缓存中取出主菜单
  let resultValue = JSON.parse(sessionStorage.getItem(projectConstant.KEY_SIDE_MENU_S));
  // console.log('sideMenusMap:', JSON.stringify(resultValue));
  return resultValue;
}

/** 得到当前用户有权限操作的侧边菜单列表 */
function getSideMenuArray(mainMenu) {
  let sideMenusMap = getSideMenusMap();
  for (let key in sideMenusMap) {
    if (mainMenu.id === key) {
      return sideMenusMap[key];
    }
  }
  return null;
}

/** 得到当前用户有权限操作的菜单集合 */
function getMenuMap() {
  // 从缓存中取出菜单集合
  let resultValue = JSON.parse(sessionStorage.getItem(projectConstant.KEY_MENU_MAP));
  //console.log('menuMap:', JSON.stringify(resultValue));
  return resultValue;
}

/**
 * 根据链接得到当前选中的主菜单
 * @param menuLink    当前链接
 */
function getCurMainMenu(menuLink) {
  let resultValue = null;
  let mainMenuArray = getMainMenuArray();
  if (mainMenuArray !== null && mainMenuArray !== undefined) {
    if (menuLink === undefined || menuLink === null || menuLink === '') {
      resultValue = mainMenuArray[0];
    } else {
      // 根据link查找一级菜单列表
      let mainLength = mainMenuArray.length;
      for (let i = 0; i < mainLength; i++) {
        let item = mainMenuArray[i];
        if (item.link === menuLink) {
          resultValue = item;
          break;
        }
      }
    }
  }
  return resultValue;
}

/**
 * 根据当前选中的侧边菜单得到当前选中的主菜单
 * @param sideMenu        当前选中的侧边菜单
 */
function getCurMainMenuBySideMenu(sideMenu) {
  let resultValue = null;
  // 从缓存中取出主菜单
  let mainMenuArray = getMainMenuArray();
  if (mainMenuArray !== null && mainMenuArray !== undefined) {
    if (sideMenu === undefined || sideMenu === null) {
      resultValue = mainMenuArray[0];
    } else {
      let mainMenuKey = sideMenu.parent_id;
      let mainLength = mainMenuArray.length;
      for (let i = 0; i < mainLength; i++) {
        let item = mainMenuArray[i];
        if (item.key === mainMenuKey + '') {
          resultValue = item;
          break;
        }
      }
    }
  }
  return resultValue;
}

/**
 * 根据链接得到当前选中的侧边菜单项：{two:二级菜单项，three:三级菜单项}
 * @param curMainMenu     当前选中的主菜单项
 * @param menuLink        当前链接
 */
function getCurSideMenus(curMainMenu, menuLink) {
  let resultValue = {};
  // 从缓存中取出侧边菜单集合
  let sideMenusMap = getSideMenusMap();
  if (curMainMenu === null) {
    let bFind = false;
    for (let key in sideMenusMap) {
      if (bFind) {
        break;
      }
      let sideMenuArray = sideMenusMap[key];
      let sideLength = sideMenuArray.length;
      // 根据link查找当前选中的二级菜单项
      for (let i = 0; i < sideLength; i++) {
        let item = sideMenuArray[i];
        if (item.link === menuLink) {
          resultValue.two = item;
          resultValue.three = null;
          bFind = true;
          break;
        } else {
          let children = item.children;
          if (children === null || children === undefined || children.length <= 0) {
            //没有子菜单，继续查找下一个侧边菜单
          } else {
            // 根据link查找当前选中的三级菜单项
            let childLength = children.length;
            for (let j = 0; j < childLength; j ++) {
              let child = children[j];
              if (child.link === menuLink) {
                resultValue.two = item;
                resultValue.three = child;
                bFind = true;
                break;
              }
            }
          }
        }
      }
    }
  } else {
    let sideMenuArray = sideMenusMap[curMainMenu.id];
    resultValue.two = sideMenuArray[0];
    resultValue.three = sideMenuArray[0].children === null || sideMenuArray[0].children === undefined ? null : sideMenuArray[0].children[0];
  }
  return resultValue;
}
