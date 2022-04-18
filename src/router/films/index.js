/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2022-04-15 09:34:45
 * @LastEditTime: 2022-04-18 14:05:42
 * @LastEditors: zaq
 * @Reference:
 */
const Router = require("koa-router");
const films = new Router();
const cheerio = require("cheerio");
const axios = require("../../utils");
const { getStrId, parse, formatStr } = require("../../utils/tools");
const baseUrl = "https://www.pkmp4.com";
const urlencode = require("urlencode");

films.get("/", async (ctx) => {
  const { data: html } = await axios.request(baseUrl);
  const $ = cheerio.load(html);
  const banner = [];
  $(".foucebox .hd ul li").each((i, v) => {
    const obj = {};
    obj.id = $(v).find("a").attr("href");
    obj.id = getStrId(obj.id);
    obj.bg = baseUrl + $(v).find("a img").attr("src");
    obj.title = $(v).find("a .txt").text();
    obj.description = $(".foucebox .bd .showDiv")
      .eq(i)
      .find(".foucebox_bg p")
      .text();
    // obj.bigBg =
    //   baseUrl + $(".foucebox .bd .showDiv").eq(i).find("a img").attr("src");
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
  info.title = first.find(".img img").attr("alt");
  info.filmYear = formatStr(first.find(".main-ui-meta h1 .year").text());
  info.other = first.find(".otherbox").text();
  info.director = [];
  first
    .find(".main-ui-meta div")
    .eq(1)
    .find("a")
    .each((i, v) => {
      // const obj = {};
      // obj.link = $(v).attr("href");
      // // obj.id = getStrId(obj.id);
      // obj.name = $(v).text();
      info.director.push($(v).text());
    });
  info.screenwriter = [];
  first
    .find(".main-ui-meta div")
    .eq(2)
    .find("a")
    .each((i, v) => {
      // const obj = {};
      // obj.link = $(v).attr("href");
      // // obj.id = getStrId(obj.id);
      // obj.name = $(v).text();
      info.screenwriter.push($(v).text());
    });
  info.starring = [];
  first
    .find(".main-ui-meta div")
    .eq(3)
    .find("a")
    .each((i, v) => {
      // const obj = {};
      // obj.link = $(v).attr("href");
      // // obj.id = getStrId(obj.id);
      // obj.name = $(v).text();
      info.starring.push($(v).text());
    });
  info.type = [];
  first
    .find(".main-ui-meta div")
    .eq(4)
    .find("a")
    .each((i, v) => {
      // const obj = {};
      // obj.link = $(v).attr("href");
      // // obj.id = getStrId(obj.id);
      // obj.name = $(v).text();
      info.type.push($(v).text());
    });
  // info.local = {
  //   name: first.find(".main-ui-meta div").eq(5).find("a").text(),
  //   link: first.find(".main-ui-meta div").eq(5).find("a").attr("href"),
  // };
  info.local = first.find(".main-ui-meta div").eq(5).find("a").text();
  // info.language = {
  //   name: first.find(".main-ui-meta div").eq(6).find("a").text(),
  //   link: first.find(".main-ui-meta div").eq(6).find("a").attr("href"),
  // };
  info.language = first.find(".main-ui-meta div").eq(6).find("a").text();
  info.playDate = first.find(".main-ui-meta div").eq(7).text();
  info.time = formatStr(first.find(".main-ui-meta div").eq(8).text());
  info.nickname = formatStr(first.find(".main-ui-meta div").eq(9).text());
  info.grade = {
    count: first.find(".main-ui-meta div").eq(10).find("a span").text(),
    link: first.find(".main-ui-meta div").eq(10).find("a").attr("href"),
  };
  info.description = formatStr($(".main-left .wrap")
    .eq(1)
    .find(".movie-introduce .sqjj_a")
    .text());

  const download = [];
  const online = [];

  $("#donLink .hd ul li").each((i, v) => {
    const obj = {};
    obj.name = formatStr($(v).text());
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
    `${baseUrl}/py/${id}.html`
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
    link: `${baseUrl}/addons/dplayer/?url=${url}`,
  };
});
films.get("/search", async (ctx) => {
  const { wd } = ctx.query;
  const { data: html } = await axios.request({
    url: `${baseUrl}/vs/-------------.html?wd=${wd}`,
    headers: {
      referer: baseUrl,
    },
  });
  const $ = cheerio.load(html);
  const list = [];
  const all = parseInt($(".main .breadcrumbs").text().substring(4));
  const temp = $(".main .sr_lists dl");
  if (all && temp.length) {
    //

    temp.each((i, v) => {
      const obj = {};
      obj.pic = baseUrl + $(v).find("dt a img").attr("src");
      const _t = $(v).find("dd p");
      obj.title = _t.eq(0).find("strong a").text();
      obj.id = getStrId(_t.eq(0).find("strong a").attr("href"));
      obj.state = _t.eq(0).find(".ss1").text();
      obj.nickname = _t.eq(1).text();
      obj.local = _t.eq(2).text();
      obj.starring = _t.eq(3).text();
      obj.time = _t.eq(4).text();
      obj.description = _t.eq(5).text();

      list.push(obj);
    });
    ctx.body = {
      count: all,
      list,
      msg: "查询成功",
    };
  } else {
    ctx.body = {
      count: all,
      msg: `没有搜到有关于${wd}的信息`,
      list: [],
      html,
    };
  }
});
films.get("/parse", async (ctx) => {
  const { url } = ctx.query;
  const links = [];
  for (const key in parse) {
    links.push(`${parse[key]}${url}`);
  }
  ctx.body = {
    msg: "获取链接成功!",
    links,
  };
});
/**
 * style 影片类型1电影2电视剧3综艺4动漫
 */
films.get("/stock", async (ctx) => {
  let { page, sort, local, type, era, lang, style } = ctx.query;
  sort = sort || "time";
  local = local === '全部' || !local ? '' : urlencode(local);
  type = type === '全部' || !type ? '' : urlencode(type);
  era = era === '全部' || !era ? '' : urlencode(era);
  lang = lang === '全部' || !lang ? '' : urlencode(lang);
  page = page || "1";
  style = style || '1';
  const { data: html } = await axios.request(
    `${baseUrl}/ms/${style}-${local}-${sort}-${type}-${lang}----${page}---${era}.html`
  );

  const $ = cheerio.load(html);
  const tag = {
      type: [],
      era: [],
      local: [],
      lang: [],
      sort: ["time", "hits", "score"],
    },
    list = [];
  for (let i = 1; i < 5; i++) {
    $(`.list-box .c${i} a`).each((j, v) => {
      if (i === 1) tag.type.push($(v).text());
      else if (i === 2) tag.era.push($(v).text());
      else if (i === 3) tag.local.push($(v).text());
      else if (i === 4) tag.lang.push($(v).text());
    });
  }
  if ($(".content-list li").length) {
    $(".content-list li").each((i, v) => {
      const obj = {};
      obj.id = getStrId($(v).find(".li-img a").attr("href"));
      obj.title = $(v).find(".li-img a").attr("title");
      obj.playCount = $(v).find(".li-img a .bottom .bottom1").text();
      obj.filmQuality = $(v).find(".li-img a .bottom .bottom2 ").text();
      obj.grade = $(v).find(".li-bottom h3 span").text();
      obj.tag = $(v).find(".li-bottom .tag").text();
      list.push(obj);
    });
  }
  if (list.length) {
    ctx.body = {
      list,
      tag,
    };
  } else {
    ctx.body = {
      tag,
      list,
      msg: "暂无此类型影片",
    };
  }
});

module.exports = films;
