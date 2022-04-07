/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-12-23 11:34:07
 * @LastEditTime: 2021-12-23 11:36:01
 * @LastEditors: zaq
 * @Reference: 
 */
const Router = require('koa-router');
const home = new Router();

home.get('/', async ctx => {
  ctx.body = '首页 ----- 首页'
})
home.get('/bannarlist', async ctx => {
  ctx.body = {
    data: ['', '', '', '']
  }
})

module.exports = home