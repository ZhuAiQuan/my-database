/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-12-23 11:00:55
 * @LastEditTime: 2022-04-07 11:29:03
 * @LastEditors: zaq
 * @Reference: 
 */
const Router = require('koa-router');
const user = require('./user');
const home = require('./home');
const api = require('./api');
const gateway = require('./gateway');
const jianshu = require('./jianshu');
const yMusic = require('./ymusic')
const errorPage = require('./errorPage')

const router = new Router();
// router.get('/', async ctx => {
//   ctx.body = '首页'
// })
router.get('/list', async ctx => {
  ctx.body = '列表页'
})
router.use('/user', user.routes(), user.allowedMethods());
router.use('/home', home.routes(), home.allowedMethods());
router.use('/404', errorPage.routes(), errorPage.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());
router.use('/gateway', gateway.routes(), gateway.allowedMethods())
router.use('/jianshu', jianshu.routes(), jianshu.allowedMethods())
router.use('/yMusic', yMusic.routes(), yMusic.allowedMethods())

router.redirect('/', '/home')

module.exports = router