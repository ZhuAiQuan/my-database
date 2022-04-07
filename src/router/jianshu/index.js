/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2022-04-06 13:14:18
 * @LastEditTime: 2022-04-06 14:11:06
 * @LastEditors: zaq
 * @Reference: 
 */
const Router = require('koa-router');
const cheerio = require('cheerio');
const axios = require('../../utils');
const formidable = require("formidable");

const jianshu = new Router();
jianshu.post('/', async ctx => {
  var form = new formidable.IncomingForm();
  let formdata = {
    page: 1
  }
  form.parse(ctx.req, async (err,fields,files) => {
    if(err){throw err; return;}
    formdata = fields
  });
  const {data: html} = +formdata.page === 1 
    ? await axios.request('https://www.jianshu.com/')
    : await axios.request({
      url: 'https://www.jianshu.com/',
      method: 'post',
      data: {
        ...formdata
      }
    })
  const $ = cheerio.load(html);
  const list = [];
  console.log(formdata.page)
  if (+formdata.page === 1) {
    $('#list-container>ul>li').each((i, v) => {
      const data = {};
      const title = $(v).find('.content>a').text();
      data['id'] = $(v).attr('data-note-id');
      data['title'] = title;
      data['link'] = $(v).find('.content>a').attr('href');
      data['abstract'] = $(v).find('.content>.abstract').text()
      if ($(v).hasClass('have-img')) {
        data['src'] = $(v).find('.wrap-img>img').attr('src')
      }
      list.push(data)
    })
  } else {
    console.log(html)
  }
  ctx.body = {
    data: list
  }
})
module.exports = jianshu