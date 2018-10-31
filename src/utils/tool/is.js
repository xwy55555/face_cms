/*
 * 输入的字符串是否是正确的手机号码
 * @param strInput
 */
export function isMobile(strInput) {
  return isCmccMobile(strInput) || isCutcMobile(strInput) || isCtccMobile(strInput);
}

/*
 * 输入的字符串是否是中国移动的手机号码
 * @param strInput
 */
export function isCmccMobile(strInput) {
  let reg = /(^13[4-9]\d{8}$)|(^14[0,7]\d{8}$)|(^15[0,1,2,4,7,8,9]\d{8}$)|(^165\d{8}$)|(^170[3,5,6]\d{7}$)|(^178\d{8}$)|(^18[2,3,4,7,8]\d{8}$)|(^198\d{8}$)/;
  return reg.test(strInput);
}

/*
 * 输入的字符串是否是中国联通的手机号码
 * @param strInput
 */
export function isCutcMobile(strInput) {
  let reg = /(^13[0-2]\d{8}$)|(^14[1,3,5,6]\d{8}$)|(^15[5,6]\d{8}$)|(^166\d{8}$)|(^170[7,8,9]\d{7}$)|(^171[8,9]\d{8}$)|(^17[5,6]\d{8}$)|(^18[5,6]\d{8}$)/;
  return reg.test(strInput);
}

/*
 * 输入的字符串是否是中国电信的手机号码
 * @param strInput
 */
export function isCtccMobile(strInput) {
  let reg = /(^133\d{8}$)|(^14[2,4,6,8,9]\d{8}$)|(^153\d{8}$)|(^170[0,1,2]\d{7}$)|(^17[3,7]\d{8}$)|(^18[0,1,9]\d{8}$)|(^199\d{8}$)/;
  return reg.test(strInput);
}

/**
 * 输入的字符串是否是yyyy-MM-dd格式的日期
 * @param date
 */
export function isValidDate(date) {
    let result = date.match(/((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/);
    return result !== null;
}

/**
 * 输入的数值是不是浮点数（包括负数和正数）
 * @param inputNumber
 */
export function isFloat(inputNumber) {
  let reg = /^(\+|-)?\d+($|\.\d+$)/;
    return reg.test(strInput);
}

/**
 * 输入的Email格式是否正确
 * @param strInput
 */
export function isEmail(strInput) {
    let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])/;
    return reg.test(strInput);
}

/**
 * 输入的Ip地址是否正确
 * @param strInput
 */
export function isIp(strInput) {
    let reg = /^((1?\d?\d|(2([0-4]\d|5[0-5])))\.){3}(1?\d?\d|(2([0-4]\d|5[0-5])))$/;
    return reg.test(strInput);
}

  /**
   * 【指定子字符串】在【指定字符串】中是否已存在
   * @param subS 		        指定子字符串
   * @param s			          指定字符串
   * @param splitFlag		    分隔符
   */
export function isExist(subS, s, splitFlag) {
  let resultValue = false;
  subS = trim(subS);
  s = trim(s);
  if (subS !== "" && s !== "") {
    let strArray = s.split(splitFlag);
    let iLength = strArray.length;
    for (let i = 0; i < iLength; i++){
      if (subS === trim(strArray[i])) {
        resultValue = true;
        break;
      }
    }
  }
  return resultValue;
}
