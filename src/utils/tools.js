/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2022-04-15 16:08:29
 * @LastEditTime: 2022-04-15 16:11:29
 * @LastEditors: zaq
 * @Reference: 
 */
const getStrId = str => {
  const arr = str.split('/');
  if (arr[2] && arr[2].includes('.html')) {
    const len = arr[2].indexOf('.html');
    return arr[2].substring(0, len)
  }
}

module.exports = {
  getStrId
}