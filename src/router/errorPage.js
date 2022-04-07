/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-12-23 13:23:14
 * @LastEditTime: 2021-12-23 13:24:29
 * @LastEditors: zaq
 * @Reference: 
 */
const Router = require('koa-router');
const errorPage = new Router();

errorPage.get('/', async ctx => {
  ctx.body = '404,访问接口不存在!'
})

module.exports = errorPage