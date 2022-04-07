/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2022-04-06 10:30:17
 * @LastEditTime: 2022-04-06 10:57:29
 * @LastEditors: zaq
 * @Reference: 
 */
const axios = require('axios');
const timeout = 10 * 1000;
class HttpRequest {
  constructor() {
    this.queue = {}
  }
  getConfig() {
    return {
      timeout,
      method: 'get',
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
        referer: ''
      }
    }
  }
  request(options) {
    const instance = axios.create();
    let data = {};
    if (typeof options === 'string') {
      data = Object.assign(
        this.getConfig(),
        {
          baseURL: options
        }
      )
    } else {
      data = Object.assign(
        this.getConfig(),
        options
      )
    }
    return instance(data)
  }
}

module.exports = HttpRequest