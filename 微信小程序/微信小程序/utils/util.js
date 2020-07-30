const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/*获取日期星期*/ 
const formatDate= date =>{
  const month = date.getMonth()+1
  const day =  date.getDate()
  return [month,day].map(formatNumber).join(".")
}
// 请求详情数据
// function getShopListinfo(str){
// }
module.exports = {
  // formatTime: formatTime,
  formatDate:formatDate,
}

