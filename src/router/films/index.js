/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2022-04-15 09:34:45
 * @LastEditTime: 2022-04-15 16:20:12
 * @LastEditors: zaq
 * @Reference:
 */
const Router = require("koa-router");
const films = new Router();
const cheerio = require("cheerio");
const axios = require("../../utils");
const { getStrId } = require("../../utils/tools");
const baseUrl = "https://www.pkmp4.com";

films.get("/", async (ctx) => {
  const { data: html } = await axios.request(baseUrl);
  const $ = cheerio.load(html);
  const banner = [];
  $(".foucebox .hd ul li").each((i, v) => {
    const obj = {};
    obj.id = $(v).find("a").attr("href");
    obj.id = getStrId(obj.id);
    obj.minBg = baseUrl + $(v).find("a img").attr("src");
    obj.title = $(v).find("a .txt").text();
    obj.description = $(".foucebox .bd .showDiv")
      .eq(i)
      .find(".foucebox_bg p")
      .text();
    obj.bigBg =
      baseUrl + $(".foucebox .bd .showDiv").eq(i).find("a img").attr("src");
    banner.push(obj);
  });
  const films_recommend = [];
  $(".main .wrap .indexShowBox #change-ul-1 li").each((i, v) => {
    const obj = {};
    obj.pic = baseUrl + $(v).find(".li-img a img").attr("src");
    obj.id = $(v).find(".li-img a").attr("href");
    obj.id = getStrId(obj.id);
    obj.playCount = $(v).find(".li-img a .bottom .bottom1").text();
    obj.type = $(v).find(".li-img a .bottom .bottom2").text();
    obj.name = $(v).find(".li-bottom a").attr("title");
    obj.filmInfo = $(v).find(".li-bottom .tag").text();
    obj.grade = $(v).find(".li-bottom span").text();
    films_recommend.push(obj);
  });
  const tv_recommend = [];
  $(".main .wrap .indexShowBox #change-ul-2 li").each((i, v) => {
    const obj = {};
    obj.pic = baseUrl + $(v).find(".li-img a img").attr("src");
    obj.id = $(v).find(".li-img a").attr("href");
    obj.id = getStrId(obj.id);
    obj.playCount = $(v).find(".li-img a .bottom .bottom1").text();
    obj.state = $(v).find(".li-img a .bottom .bottom2").text();
    obj.name = $(v).find(".li-bottom a").attr("title");
    obj.filmInfo = $(v).find(".li-bottom .tag").text();
    obj.grade = $(v).find(".li-bottom span").text();
    tv_recommend.push(obj);
  });
  const show_recommend = [];
  $(".main .wrap .indexShowBox #change-ul-3 li").each((i, v) => {
    const obj = {};
    obj.pic = baseUrl + $(v).find(".li-img a img").attr("src");
    obj.id = $(v).find(".li-img a").attr("href");
    obj.id = getStrId(obj.id);
    obj.playCount = $(v).find(".li-img a .bottom .bottom1").text();
    obj.state = $(v).find(".li-img a .bottom .bottom2").text();
    obj.name = $(v).find(".li-bottom a").attr("title");
    obj.filmInfo = $(v).find(".li-bottom .tag").text();
    obj.grade = $(v).find(".li-bottom span").text();
    show_recommend.push(obj);
  });
  const cartoon_recommend = [];
  $(".main .wrap .indexShowBox #change-ul-4 li").each((i, v) => {
    const obj = {};
    obj.pic = baseUrl + $(v).find(".li-img a img").attr("src");
    obj.id = $(v).find(".li-img a").attr("href");
    obj.id = getStrId(obj.id);
    obj.playCount = $(v).find(".li-img a .bottom .bottom1").text();
    obj.state = $(v).find(".li-img a .bottom .bottom2").text();
    obj.name = $(v).find(".li-bottom a").attr("title");
    obj.filmInfo = $(v).find(".li-bottom .tag").text();
    obj.grade = $(v).find(".li-bottom span").text();
    cartoon_recommend.push(obj);
  });
  ctx.body = {
    banner,
    recommend: {
      films_recommend,
      tv_recommend,
      show_recommend,
      cartoon_recommend,
    },
  };
});
films.get("/detail", async (ctx) => {
  const { id } = ctx.query;
  const { data: html } = await axios.request(`${baseUrl}/mv/${id}.html`);
  const $ = cheerio.load(html);
  const info = {};
  const first = $(".main-left .wrap").eq(0);
  info.pic = baseUrl + first.find(".img img").attr("src");
  info.title = first.find(".img img").attr("title");
  info.filmYear = first.find(".main-ui-meta h1 .year").text();
  info.other = first.find(".otherbox").text();
  info.director = [];
  first
    .find(".main-ui-meta div")
    .eq(1)
    .find("a")
    .each((i, v) => {
      const obj = {};
      obj.link = $(v).attr("href");
      // obj.id = getStrId(obj.id);
      obj.name = $(v).text();
      info.director.push(obj);
    });
  info.screenwriter = [];
  first
    .find(".main-ui-meta div")
    .eq(2)
    .find("a")
    .each((i, v) => {
      const obj = {};
      obj.link = $(v).attr("href");
      // obj.id = getStrId(obj.id);
      obj.name = $(v).text();
      info.screenwriter.push(obj);
    });
  info.starring = [];
  first
    .find(".main-ui-meta div")
    .eq(3)
    .find("a")
    .each((i, v) => {
      const obj = {};
      obj.link = $(v).attr("href");
      // obj.id = getStrId(obj.id);
      obj.name = $(v).text();
      info.starring.push(obj);
    });
  info.type = [];
  first
    .find(".main-ui-meta div")
    .eq(4)
    .find("a")
    .each((i, v) => {
      const obj = {};
      obj.link = $(v).attr("href");
      // obj.id = getStrId(obj.id);
      obj.name = $(v).text();
      info.type.push(obj);
    });
  info.local = {
    name: first.find(".main-ui-meta div").eq(5).find("a").text(),
    link: first.find(".main-ui-meta div").eq(5).find("a").attr("href"),
  };
  info.language = {
    name: first.find(".main-ui-meta div").eq(6).find("a").text(),
    link: first.find(".main-ui-meta div").eq(6).find("a").attr("href"),
  };
  info.playDate = first.find(".main-ui-meta div").eq(7).text();
  info.time = first.find(".main-ui-meta div").eq(8).text();
  info.nickname = first.find(".main-ui-meta div").eq(9).text();
  info.grade = {
    count: first.find(".main-ui-meta div").eq(10).find("a span").text(),
    link: first.find(".main-ui-meta div").eq(10).find("a").attr("href"),
  };
  info.description = $(".main-left .wrap")
    .eq(1)
    .find(".movie-introduce .sqjj_a")
    .text();

  const download = [];
  const online = [];

  $("#donLink .hd ul li").each((i, v) => {
    const obj = {};
    obj.name = $(v).text();
    obj.downlink = [];
    $("#donLink .down-list ul")
      .eq(i)
      .find("li")
      .each((_i, item) => {
        const temp = {};
        temp.link = $(item).find("a").attr("href");
        temp.title = $(item).find("a").attr("title");
        obj.downlink.push(temp);
      });
    download.push(obj);
  });
  $("#url .sBox h2 .py-tabs li").each((i, v) => {
    const obj = {};
    obj.name = $(v).text();
    obj.source = [];
    $("#url .sBox .bd ul")
      .eq(i)
      .find("li")
      .each((_i, item) => {
        const temp = {};
        temp.title = $(item).find("a").text();
        temp.id = getStrId($(item).find("a").attr("href"));
        obj.source.push(temp);
      });
    online.push(obj);
  });

  ctx.body = {
    info,
    download,
    online,
  };
});
films.get("/play", async (ctx) => {
  const { id } = ctx.query;
  const { data: html } = await axios.request(
    `https://www.pkmp4.com/py/${id}.html`
  );
  const $ = cheerio.load(html);
  const sourceStr = $(".p_movie script").html();
  const len = sourceStr.indexOf("https:");
  const lastLen = sourceStr.substring(len).indexOf('",');
  const url = sourceStr
    .substring(len)
    .substring(0, lastLen)
    .replace('"', "")
    .replace(/[\\]/g, "");

  ctx.body = {
    url,
    link: `https://www.pkmp4.com/addons/dplayer/?url=${url}`,
  };
});

module.exports = films;
