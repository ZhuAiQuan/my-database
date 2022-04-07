/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2022-04-01 14:53:10
 * @LastEditTime: 2022-04-01 16:34:53
 * @LastEditors: zaq
 * @Reference: 
 */
const Router = require('koa-router');
const gateway = new Router();

gateway.get('/', async ctx => {
  ctx.body = '首页 ----- 首页'
})

gateway.get('/locate', async ctx => {
  console.log(ctx.params, ctx.query, ctx.headers)
  ctx.body = {}
})

module.exports = gateway