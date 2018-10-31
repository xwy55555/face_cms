/** 今天 */
export function setCurrentDayRange(){
  let today = getCurrentYYYYMMDD();
  document.getElementById("from").value = today;
  document.getElementById("to").value = today;
}

/** 本周 */
export function setCurrentWeekRange(){
  document.getElementById("from").value = formatDate(getCurrentSunday(), "yyyy-MM-dd");
  document.getElementById("to").value = getCurrentYYYYMMDD();
}

/** 本月 */
export function setCurrentMonthRange(){
  let dd = new Date();
  let year = dd.getFullYear();
  let month = dd.getMonth() + 1;
  document.getElementById("from").value = year + "-" + (month > 9 ? month : "0" + month) + "-01";
  document.getElementById("to").value = getCurrentYYYYMMDD();
}

/** 本年 */
export function setCurrentYearRange(){
  let d = new Date();
  let year = d.getFullYear();
  document.getElementById("from").value = year + "-01-01";
  document.getElementById("to").value = year + "-12-31";
}
