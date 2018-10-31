import * as util from '../../utils/tool/util';

/**
 * 得到当前按键事件的按键码
 * 兼容ie、firefox、opera
 * 回车键的keyCode=13
 */
export function getKeyCode(e) {
    let curKeyCode = 0;
    e = e||event;
    curKeyCode = e.keyCode || e.which || e.charCode;
    return curKeyCode;
}

/**
 * 从文件路径中得到文件名称
 * @param filePathName
 */
export function getFileName(filePathName) {
    let pos = filePathName.lastIndexOf("/");
    if(pos === -1){
       pos = filePathName.lastIndexOf("\\")
    }
    return filePathName.substring(pos + 1);
}

/**得到当前年*/
export function getCurrentYear(){
    let dd = new Date();
    return dd.getFullYear();
}

/** 得到当前季 */
export function getCurrentQuarter(){
    let dd = new Date();
    let month = dd.getMonth() + 1;
    return parseInt((month - 1) / 3) + 1;
}

/** 得到当前月 */
export function getCurrentMonth(){
    let dd = new Date();
    return dd.getMonth() + 1;
}

/** 得到当前天 */
export function getCurrentDay(){
    let dd = new Date();
    return dd.getDate();
}

/** 得到当前年-月-日（yyyy-mm-dd) */
export function getCurrentYYYYMMDD(){
    let dd = new Date();
    let y = dd.getFullYear();
    let m = dd.getMonth() + 1;
    let d = dd.getDate();
    return y + "-" + (m > 9 ? m : "0" + m) + "-" + (d > 9 ? d : "0" + d);
}

/** 得到当前年-月-日 时:分:秒（yyyy-mm-dd HH:mm:ss) */
export function getCurrentYYYYMMDDHHMMSS(){
  let dd = new Date();
  let y = dd.getFullYear();
  let m = dd.getMonth() + 1;
  let d = dd.getDate();
  let hh = dd.getHours();
  let mm = dd.getMinutes();
  let ss = dd.getSeconds();
  return y + "-" + (m > 9 ? m : "0" + m) + "-" + (d > 9 ? d : "0" + d) + " " +  hh + ":" + mm + ":" + ss;
}

/** 得到本周周日 */
export function getCurrentSunday(){
    let dd = new Date();
    // 一周中的第几天
    let weekDay = dd.getDay();
    // 一天的毫秒数
    let millisecond = 1000 * 60 * 60 * 24;
    // 本周周日
    return new Date(dd.getTime() - weekDay * millisecond);
}

/**
 * 得到指定偏移天数的日期（yyyy-mm-dd)
 * @param dayOffset		偏移的天数
 */
export function getDate(dayOffset) {
    let dd = new Date();
    dd.setDate(dd.getDate() + dayOffset);
    let y = dd.getFullYear();
    let m = dd.getMonth() + 1;
    let d = dd.getDate();
    return y + "-" + (m > 9 ? m : "0" + m) + "-" + (d > 9 ? d : "0" + d);
}

/** 得到当前月份的天数*/
export function getDayCountOfCurMonth() {
  let dd = new Date();
  let y = dd.getFullYear();
  let m = dd.getMonth() + 1;
  let tempDD = new Date(y, m, 0);
  return tempDD.getDate();
}

/** 得到当前月份的第一天*/
export function getFirstDateOfCurMonth() {
  let dd = new Date();
  let y = dd.getFullYear();
  let m = dd.getMonth() + 1;
  return y + "-" + (m > 9 ? m : "0" + m) + "-01"
}

/** 得到当前月份的最后一天*/
export function getLastDateOfCurMonth() {
  let dd = new Date();
  let y = dd.getFullYear();
  let m = dd.getMonth() + 1;
  let d = getDayCountOfCurMonth();
  return y + "-" + (m > 9 ? m : "0" + m) + "-" + d;
}

/** 得到当前年份的最后一天*/
export function getLastDateOfCurYear() {
  let dd = new Date();
  let y = dd.getFullYear();
  let d = getDayCountOfCurMonth();
  return y + "-12-" + d;
}

/**
 * 得到指定字段的值
 * @param fieldId			指定字段Id
 */
export function getFieldValue(fieldId) {
  let fieldValue = document.getElementById(fieldId).value;
  return util.trim(fieldValue);
}

/**
 * 得到指定复选框的值
 * @param fieldId			指定字段Id
 */
export function getCheckBoxValue(fieldId) {
    let fieldValue = document.getElementById(fieldId).checked;
    return util.trim(fieldValue);
}
