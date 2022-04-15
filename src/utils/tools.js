/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2022-04-15 16:08:29
 * @LastEditTime: 2022-04-15 17:34:52
 * @LastEditors: zaq
 * @Reference: 
 */
const parse = {
  'OK解析接口': 'https://okjx.cc/?url=',
  'BL智能解析接口': 'https://vip.bljiex.com/?v=',
  'Parwix解析接口': 'https://jx.parwix.com:4433/player/?url=',
  'M3U8解析接口': 'https://jx.m3u8.tv/jiexi/?url=',
  '爱跟解析接口': 'https://vip.2ktvb.com/playercenter/?url=',
  'H8解析接口': 'https://www.h8jx.com/jiexi.php?url=',
  'M1907解析接口': 'https://z1.m1907.cn/?jx=',
  '17kyun解析接口': 'https://17kyun.com/api.php?url=',
  '618G解析接口': 'https://jx.618g.com/?url='
}

const getStrId = str => {
  const arr = str.split('/');
  if (arr[2] && arr[2].includes('.html')) {
    const len = arr[2].indexOf('.html');
    return arr[2].substring(0, len)
  }
}

module.exports = {
  getStrId,
  parse
}