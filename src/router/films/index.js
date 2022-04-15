/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2022-04-15 09:34:45
 * @LastEditTime: 2022-04-15 10:06:18
 * @LastEditors: zaq
 * @Reference: 
 */
const Router = require('koa-router');
const films = new Router();
const cheerio = require('cheerio');
const axios = require('../../utils');

films.get('/', async ctx => {
  const {data: html} = await axios.request('https://www.pkmp4.com/');
  const $ = cheerio.load(html);
  const banner = [];
  $('.foucebox .hd ul li').each((i, v) => {
    const obj = {};
    obj.link = $(v).find('a').attr('href');
    obj.pic = $(v).find('a img').attr('src');
    obj.title = $(v).find('a .txt').text();
    banner.push(obj)
  })
  const films_recommend = [];
  $('.main .wrap .indexShowBox #change-ul-1 li').each((i, v) => {
    const obj = {};
    obj.pic = $(v).find('.li-img a img').attr('src');
    obj.link = $(v).find('.li-img a').attr('href');
    obj.playCount = $(v).find('.li-img a .bottom .bottom1').text();
    obj.type = $(v).find('.li-img a .bottom .bottom2').text();
    obj.name = $(v).find('.li-bottom a').attr('title');
    obj.filmInfo = $(v).find('.li-bottom .tag').text();
    obj.grade = $(v).find('.li-bottom span').text();
    films_recommend.push(obj)
  })
  const tv_recommend = [];
  $('.main .wrap .indexShowBox #change-ul-2 li').each((i, v) => {
    const obj = {};
    obj.pic = $(v).find('.li-img a img').attr('src');
    obj.link = $(v).find('.li-img a').attr('href');
    obj.playCount = $(v).find('.li-img a .bottom .bottom1').text();
    obj.state = $(v).find('.li-img a .bottom .bottom2').text();
    obj.name = $(v).find('.li-bottom a').attr('title');
    obj.filmInfo = $(v).find('.li-bottom .tag').text();
    obj.grade = $(v).find('.li-bottom span').text();
    tv_recommend.push(obj)
  })
  const show_recommend = [];
  $('.main .wrap .indexShowBox #change-ul-3 li').each((i, v) => {
    const obj = {};
    obj.pic = $(v).find('.li-img a img').attr('src');
    obj.link = $(v).find('.li-img a').attr('href');
    obj.playCount = $(v).find('.li-img a .bottom .bottom1').text();
    obj.state = $(v).find('.li-img a .bottom .bottom2').text();
    obj.name = $(v).find('.li-bottom a').attr('title');
    obj.filmInfo = $(v).find('.li-bottom .tag').text();
    obj.grade = $(v).find('.li-bottom span').text();
    show_recommend.push(obj)
  })
  const cartoon_recommend = [];
  $('.main .wrap .indexShowBox #change-ul-4 li').each((i, v) => {
    const obj = {};
    obj.pic = $(v).find('.li-img a img').attr('src');
    obj.link = $(v).find('.li-img a').attr('href');
    obj.playCount = $(v).find('.li-img a .bottom .bottom1').text();
    obj.state = $(v).find('.li-img a .bottom .bottom2').text();
    obj.name = $(v).find('.li-bottom a').attr('title');
    obj.filmInfo = $(v).find('.li-bottom .tag').text();
    obj.grade = $(v).find('.li-bottom span').text();
    cartoon_recommend.push(obj)
  })
  ctx.body = {
    banner,
    recommend: {
      films_recommend,
      tv_recommend,
      show_recommend,
      cartoon_recommend
    }
  }
})

module.exports = films