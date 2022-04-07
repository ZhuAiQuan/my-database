/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-12-23 11:34:07
 * @LastEditTime: 2021-12-29 14:48:26
 * @LastEditors: zaq
 * @Reference: 
 */
const Router = require('koa-router');
const api = new Router();

api.get('/', async ctx => {
  ctx.body = '首页 ----- 首页'
})
api.get('/bannarlist', async ctx => {
  ctx.body = {
    data: ['', '', '', '']
  }
})

module.exports = api