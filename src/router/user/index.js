/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-12-23 11:24:10
 * @LastEditTime: 2021-12-23 11:30:11
 * @LastEditors: zaq
 * @Reference: 
 */
const Router = require('koa-router');

const user = new Router();

user.get('/', async ctx => {
  ctx.body = 'dingzong yyds'
})
user.get('/info', async ctx => {
  ctx.body = {
    id: '000671',
    name: 'zaq'
  }
})
user.post('/updateinfo', async ctx => {
  ctx.body = {
    message: '修改成功！'
  }
})

module.exports = user;