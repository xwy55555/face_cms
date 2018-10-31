/**
 * 去掉输入字符串的左空格
 * @param strInput
 */
export function ltrim(strInput){
    return strInput.replace(/^\s*/, "");
}

/**
 * 去掉输入字符串的右空格
 * @param strInput
 */
export function rtrim(strInput){
    return strInput.replace(/\s*$/, "");
}

/**
 * 去掉输入字符串的左右空格
 * @param strInput
 */
export function trim(strInput){
    return rtrim(ltrim(strInput));
}

/**
 * 去掉输入字符串的所有空格
 * @param strInput
 */
export function dropBlankSpace(strInput){
    return strInput.replace(/\s/g, "");
}

/**
 * 实现替换[strInput]中的全部[oldStr]为[newStr]
 * g=global, m=multiLine
 * 有一个简单的操作可验证此方法：
 * 在浏览器地址栏输入
 * javascript:alert("aa11aa22aa33aa44aa55".replace(new RegExp("aa","gm"),"bb"))
 * 即可看到全部替换的效果
 * @param strInput
 * @param oldStr
 * @param newStr
 */
export function replaceAll(strInput, oldStr, newStr) {
    return strInput.replace(new RegExp(oldStr, "gm"), newStr);
}

/**
 * 按指定格式，格式化日期: yyyy-MM-dd hh:mm:ss
 * @param date
 * @param format
 */
export function formatDate(date, format){
  let paddNum = function(num){
    num += "";
    return num.replace(/^(\d)$/,"0$1");
  };
  let cfg = {
    yyyy : date.getFullYear() 							//年 : 4位
    ,yy : date.getFullYear().toString().substring(2)	//年 : 2位
    ,M  : date.getMonth() + 1  							//月 : 如果1位的时候不补0
    ,MM : paddNum(date.getMonth() + 1) 					//月 : 如果1位的时候补0
    ,d  : date.getDate()   								//日 : 如果1位的时候不补0
    ,dd : paddNum(date.getDate())						//日 : 如果1位的时候补0
    ,hh : paddNum(date.getHours())  					//时
    ,mm : paddNum(date.getMinutes()) 					//分
    ,ss : paddNum(date.getSeconds()) 					//秒
  };
  format || (format = "yyyy-MM-dd hh:mm:ss");
  return format.replace(/([a-z])(\1)*/ig,function(m){return cfg[m];});
}

/** 只能输入数字 */
export function onlyNum() {
  if (!(event.keyCode === 46) && !(event.keyCode === 8) && !(event.keyCode === 37) && !(event.keyCode === 39)) {
    if (!((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))) {
      event.returnValue = false;
    }
  }
}

/**
 * 处理输入对象的属性，把null和undefined的值替换成空字符串
 * @param data
 * @returns {*}
 */
export function dealData(data) {
  if (data !== null && data !== undefined) {
    for (let key in data) {
      let value = data[key];
      data[key] = value === null || value === undefined ? "" : value;
    }
  }
  return data;
}
