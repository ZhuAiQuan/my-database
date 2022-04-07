/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2021-12-23 10:31:09
 * @LastEditTime: 2022-04-01 15:05:32
 * @LastEditors: zaq
 * @Reference: 
 */
const Koa = require('koa2');
const cors = require('koa2-cors');
const parser = require('koa-bodyparser');
const routers = require('./router');
const app = new Koa();
const port = 3300;

app.use(cors());
app.use(parser())
app.use(routers.routes(), routers.allowedMethods());
app.use(async (ctx, next) => {
  await next()
  if (+ctx.status === 404) {
    ctx.response.redirect('/404')
  }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
