/*
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2022-04-07 11:26:49
 * @LastEditTime: 2022-04-08 10:38:04
 * @LastEditors: zaq
 * @Reference:
 */
const Router = require("koa-router");
const yMusic = new Router();
const axios = require("../../utils");
const cheerio = require("cheerio");

yMusic.get("/", async (ctx) => {
  ctx.body = "y.music.163.com";
});
yMusic.get("/recommend", async (ctx) => {
  const { data: html } = await axios.request({
    url: "https://y.music.163.com/m/",
    method: "get",
    headers: {
      referer: "https://music.163.com/",
    },
  });
  // await axios.request({
  //   url: "https://interface.music.163.com/weapi/personalized/newsong",
  //   method: "post",
  //   headers: {
  //     referer: "https://y.music.163.com/",
  //   },
  // });
  const recommend = [];
  const $ = cheerio.load(html);
  $(".remd_ul a").each((i, v) => {
    const obj = {};
    obj["link"] = $(v).attr("href");
    obj["title"] = $(v).find(".remd_text").text();
    obj["src"] = $(v).find(".remd_img img").attr("src");
    obj["num"] = $(v).find(".remd_img .remd_lnum").text();
    recommend.push(obj);
  });
  ctx.body = {
    recommend,
  };
});
yMusic.get("/kuwo", async (ctx) => {
  const { data: html } = await axios.request({
    url: "http://m.kuwo.cn/newh5app/",
    headers: {
      Host: "m.kuwo.cn",
    },
  });
  const $ = cheerio.load(html);
  const banner = [];
  const top = {};
  const recommend = [];
  const listenBook = [];
  $(".wrap .swiper-wrapper .swiper-slide").each((i, v) => {
    const src = $(v).find(".pic img").attr("src");
    banner.push(src);
  });
  $(".list .rankingList .rankcontent .rankcontentinclude").each((i, v) => {
    top[i] = [];
    $(v)
      .find(
        ".rankcontentincluderight .rankcontentincluderightlist ul .wordType"
      )
      .each((_i, val) => {
        top[i].push($(val).text());
      });
  });
  $(".recommendlist .recommendcontent .recommendcontentinclude").each(
    (i, v) => {
      const src = $(v).find(".top .backtop>img").attr("data-src");
      const num = $(v).find(".top .pic p").text();
      const title = $(v).find(".bottom p").text();
      const obj = {
        src,
        num,
        title,
      };
      recommend.push(obj);
    }
  );
  $(".recommendlist2 .recommendcontent .recommendcontentinclude").each(
    (i, v) => {
      const src = $(v).find(".top .backtop>img").attr("data-src");
      const num = $(v).find(".top .pic p").text();
      const title = $(v).find(".bottom .p1").text();
      const subtitle = $(v).find(".bottom .p2").text();
      const obj = {
        src,
        num,
        title,
        subtitle,
      };
      listenBook.push(obj);
    }
  );

  ctx.body = {
    banner,
    top,
    recommend,
    listenBook,
  };
});
/**
 * @description type 热歌榜16飙升榜93新歌榜17
 * pn 页码
 * rn 一页总数量
 */
yMusic.get("/kuwo/top", async (ctx) => {
  const { type, pn, rn } = ctx.query;
  const { data } = await axios.request({
    url: `http://m.kuwo.cn/newh5app/api/mobile/v1/music/rank/${type}?pn=${pn}&rn=${rn}`,
  });
  ctx.body = {
    data,
  };
});
// 歌曲榜 标签tag
yMusic.post("/kuwo/top/tag", async (ctx) => {
  const { data } = await axios.request({
    url: `http://m.kuwo.cn/newh5app/api/mobile/v1/typelist/rank`,
    headers: {
      Referer: `http://m.kuwo.cn/newh5app/`,
    },
  });
  ctx.body = {
    data,
  };
});
// 播放歌曲
yMusic.get("/kuwo/song", async (ctx) => {
  const { id } = ctx.query;
  const { data } = await axios.request(
    `http://m.kuwo.cn/newh5app/api/mobile/v2/music/src/${id}`
  );
  ctx.body = {
    data,
  };
});
// 歌曲信息
yMusic.get("/kuwo/song/info", async (ctx) => {
  const { id } = ctx.query;
  const { data } = await axios.request(
    `http://m.kuwo.cn/newh5app/api/mobile/v1/music/info/${id}`
  );
  ctx.body = {
    data,
  };
});
// 精彩推荐
yMusic.get("/kuwo/commercial", async (ctx) => {
  const { data } = await axios.request(
    "http://m.kuwo.cn/newh5app/api/mobile/v1/commercial"
  );
  ctx.body = { data };
});
// 推荐歌单tag
yMusic.get("/kuwo/recommend/tag", async (ctx) => {
  const { data } = await axios.request(
    "http://m.kuwo.cn/newh5app/api/mobile/v1/typelist/playlist"
  );
  ctx.body = { data };
});
/**
 * @description type hot最热new最新
 */
yMusic.get("/kuwo/recommend/top", async (ctx) => {
  const { type } = ctx.query;
  const { data } = await axios.request(
    `http://m.kuwo.cn/newh5app/api/mobile/v1/playlist/rcm/${type}`
  );
  ctx.body = {
    data,
  };
});
// 推荐歌单tag 详情
yMusic.get("/kuwo/recommend/type", async (ctx) => {
  const { pn, rn, type } = ctx.query;
  const { data } = await axios.request({
    url: `http://m.kuwo.cn/newh5app/api/mobile/v1/playlist/type/${type}?pn=${pn}&rn=${rn}`,
    headers: {
      Referer:
        "http://m.kuwo.cn/newh5app/playlist_classify/%7B%22id%22:%222200%22,%22pic%22:%22http:%2F%2Fkwimg3.kuwo.cn%2Fstar%2Fupload%2F44%2F27%2F1640834798273_.jpeg%22,%22name%22:%22%E6%83%85%E6%AD%8C%22%7D",
    },
  });
  ctx.body = {
    data,
  };
});
// 歌单详情
yMusic.get("/kuwo/recommend/type/list", async (ctx) => {
  const { id, pn, rn } = ctx.query;
  const { data } = await axios.request({
    url: `http://m.kuwo.cn/newh5app/api/mobile/v1/music/playlist/${id}?pn=${pn}&rn=${rn}`,
    headers: {
      Referer: `http://m.kuwo.cn/newh5app/playlist_detail/${id}`,
    },
  });
  ctx.body = {
    data,
  };
});
// 听书 type 1最热2最新
yMusic.get("/kuwo/radio", async (ctx) => {
  const { type, pn, rn } = ctx.query;
  const { data } = await axios.request({
    url: `http://m.kuwo.cn/newh5app/api/mobile/v1/radio/rcm/${type}?pn=${pn}&rn=${rn}`,
  });
  ctx.body = {
    data,
  };
});
/**
 * 听书tag 有声小说8相声曲艺36两性情感34音乐故事37脱口秀35历史人物33儿童10
 */
yMusic.get("/kuwo/radio/rank", async (ctx) => {
  const { id, pn, rn } = ctx.query;
  const { data } = await axios.request({
    url: `http://m.kuwo.cn/newh5app/api/mobile/v1/radio/rank/${id}?pn=${pn}&rn=${rn}`,
    headers: {
      Referer: "http://m.kuwo.cn/newh5app/radio",
    },
  });
  ctx.body = {
    data,
  };
});
// 专辑详情 有声小说详情
yMusic.get("/kuwo/radio/album", async (ctx) => {
  const { id, pn, rn, referer } = ctx.query;
  const { data } = await axios.request({
    url: `http://m.kuwo.cn/newh5app/api/mobile/v1/music/album/${id}?pn=${pn}&rn=${rn}`,
    headers: {
      Referer: `http://m.kuwo.cn/newh5app/radio_classify/${referer || 36}`,
    },
  });
  ctx.body = {
    data,
  };
});
// 热词
yMusic.get("/kuwo/hotword", async (ctx) => {
  const { data } = await axios.request(
    "http://m.kuwo.cn/newh5app/api/mobile/v1/search/hotword"
  );
  ctx.body = {
    data,
  };
});
// 搜索提示
yMusic.get("/kuwo/search/tips", async (ctx) => {
  const { word } = ctx.query;
  const { data } = await axios.request(
    `http://m.kuwo.cn/newh5app/api/mobile/v1/search/tip?key=${word}`
  );
  ctx.body = {
    data,
  };
});
// 搜索
yMusic.get("/kuwo/search/all", async (ctx) => {
  const { word } = ctx.query;
  const { data } = await axios.request(
    `http://m.kuwo.cn/newh5app/api/mobile/v1/search/all?key=${word}`
  );
  ctx.body = {
    data,
  };
});
// 歌手
yMusic.get("/kuwo/artist", async (ctx) => {
  const { id } = ctx.query;
  const { data } = await axios.request({
    url: `http://m.kuwo.cn/newh5app/api/mobile/v1/artist/info/${id}`,
    headers: {
      Referer: `http://m.kuwo.cn/newh5app/search`,
    },
  });
  ctx.body = {
    data,
  };
});
// 歌手 歌曲
yMusic.get("/kuwo/artist/songs", async (ctx) => {
  const { id, pn, rn } = ctx.query;
  const { data } = await axios.request({
    url: `http://m.kuwo.cn/newh5app/api/mobile/v1/music/artist/${id}?pn=${pn}&rn=${rn}`,
    headers: {
      Referer: `http://m.kuwo.cn/newh5app/search`,
    },
  });
  ctx.body = {
    data,
  };
});
// 歌曲 视频
/**
 * @description source 默认是7 推荐视频播放是74（歌手视频7 用户74）
 */
yMusic.get("/kuwo/song/video", async (ctx) => {
  const { id, source } = ctx.query;
  const { data } = await axios.request({
    url: `http://m.kuwo.cn/newh5app/api/mobile/v1/video/info/${id}?source=${source}`,
    headers: {
      Referer: `http://m.kuwo.cn/newh5app/ranklist_detail/16`,
    },
  });
  ctx.body = {
    data,
  };
});
// 歌曲 视频 推荐视频
yMusic.get("/kuwo/song/video/recommend", async (ctx) => {
  const { id } = ctx.query;
  const { data } = await axios.request({
    url: `http://m.kuwo.cn/newh5app/api/mobile/v1/video/rcmlist/${id}?source=7`,
    headers: {
      Referer: `http://m.kuwo.cn/newh5app/ranklist_detail/16`,
    },
  });
  ctx.body = {
    data,
  };
});

module.exports = yMusic;
