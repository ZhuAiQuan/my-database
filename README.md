<!--
 * @Description: xingp，yyds
 * @Author: zaq
 * @Date: 2022-04-07 17:43:43
 * @LastEditTime: 2022-04-18 14:35:27
 * @LastEditors: zaq
 * @Reference: 
-->
[2022-04-18]
# 本次新增电影资讯爬虫接口
全部接口都采用了爬虫来爬取数据，所以接口访问速度比较慢。

# 首页
## /films
### 获取首页数据展示

# 电影1剧集2综艺3动漫4
## /films/stoke
### 参数： page, sort, local, type, era, lang, style 页码 排序方式 地区 类型 年限 语言 类型（1234电影剧集...）

# 详情
## /films/detail
### 参数 id 对应电影之类的id
### 获取电影、电视等的详情信息

# 获取播放地址
## /films/play
### 参数id 对应详情里播放地址的id
### 获取播放地址

# 查询
## /films/search
### 该网站做了反爬虫需要验证码 该接口暂时无法解析成功

# 额外项 解析各大网站vip电影
## /films/parse
### 参数 url对应的需要解析的地址
### 获取解析后的播放地址

[2022-04-?]
# 本次新增了酷我音乐h5页面的接口
小部分接口采用了爬虫获取 其余的做转发

# 灵感来源于 [nodejs 网易云api接口](https://github.com/Binaryify/NeteaseCloudMusicApi)
# 本项目已配置好了vercel 可以fork后直接部署到vercel网站 具体详情可看上面网易云api链接里的readme

# 默认get请求 post会特别声明出来
## 分页参数 pn页码 rn一页总数

# 首页 （爬虫获取）
## /yMusic/kuwo
### 部署vercel 请求500 暂时无法解决

# 排行榜数据
## /yMusic/kuwo/top/tag
## method post
### 获取各排行榜数据

# 排行榜榜单列表
## /yMusic/kuwo/top
### 参数type为上个接口数据里的sourceid pn页码 rn一页总数

# 歌曲链接
## /yMusic/kuwo/song
### 参数歌曲id

# 歌曲信息
## /yMusic/kuwo/song/info
### 参数同上

# 精彩推荐
## /yMusic/kuwo/commercial

# 推荐歌单tag
## /yMusic/kuwo/recommend/tag
### 获取歌单的标签

# 最热/最新歌单
## /yMusic/kuwo/recommend/top
### 参数hot/new

# 推荐歌单tag 详情列表
## /yMusic/kuwo/recommend/type
### 参数传入页码一页总数和上上个接口拿到的tag id

# 歌单详情
## /yMusic/kuwo/recommend/type/list
### 参数传入页码一页总数和上个接口拿到的歌单 id

# 听书tag
## /yMusic/kuwo/radio/rank
### 有声小说8相声曲艺36两性情感34音乐故事37脱口秀35历史人物33儿童10
### 参数传入页码一页总数和上面对应的id

# 听书最新最热
## /yMusic/kuwo/radio
### 参数传入页码一页总数和（1最热2最新）

# 听书列表详情
## /yMusic/kuwo/radio/album
### 页码页总和上个接口拿到的听书列表id

# 热词
## /yMusic/kuwo/hotword
### 获取搜索歌曲时的热词推荐 无参数

# 搜索提示
## /yMusic/kuwo/search/tips
### 搜索时的提示建议 参数word

# 搜索
## /yMusic/kuwo/search/all
### 提交搜索 参数同上

# 歌手详情
## /yMusic/kuwo/artist
### 传入歌手id获取歌手信息

# 歌手歌曲
## /yMusic/kuwo/artist/songs
### 传入歌手id 页码页总

# 歌曲视频
## /yMusic/kuwo/song/video
### 参数source 默认是7 推荐视频播放是74（歌手视频7 用户74） id为歌曲id

# 歌曲 视频 推荐视频
## /yMusic/kuwo/song/video/recommend
### 歌曲id