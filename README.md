# 音乐列表

## 功能模块

- 首页音乐列表加载
- 添加音乐
- 删除音乐
- 修改音乐


## 第三方模块
```
"dependencies": {
    "art-template": "^3.0.3", // 浏览器端使用的模板引擎
    "body-parser": "^1.15.2", // 解析处理表单 post 请求体
    "bootstrap": "^3.3.7", // UI 框架
    "ejs": "^2.5.2", // 和 Express 结合使用的模板引擎
    "express": "^4.14.0", // 基于node的快速 Web 开发框架
    "formidable": "^1.0.17", // 处理表单文件上传
    "jquery": "^3.1.1", // 前端DOM操作库
    "moment": "^2.15.2", // 处理时间的一个js库
    "mysql": "^2.11.1" // 操作 MySQL 数据库的一个驱动包
  }
```
### 目录结构
![目录结构](readme_img/05_目录结构.png "目录结构")

### 打开步骤

1. 开wampserver，wampserver自带mysql
2. 装navicat,连接mysql，wampserver默认mysql用户名root，端口3306，密码为空
![navicat](readme_img/01_navicat.png "navicat")
![navicat连接mysql](readme_img/01_navicat_02.png "navicat连接mysql")
3. 新建数据库，数据库名称是『codepackage』
![新建数据库](readme_img/01_navicat_03.png "新建数据库")
4. 在数据库下新建一张表，其中id字段设置<font color=red>自动替增、设为主键</font>
![新建表](readme_img/02_新建表_01.png "新建表")
![新建表](readme_img/02_新建表_02_字段.png "新建表")
5. 保存表，表的名字是『music』
![新建表](readme_img/02_新建表_03_保存.png "新建表")
![新建表](readme_img/02_新建表_04_完成.png "新建表")
6.『music』文件夹下打开命令窗口，敲 『node app.js』，浏览器地址『http://localhost:3000/』下查看效果
### 效果
#### 添加音乐
![添加音乐](readme_img/03_添加音乐.png "添加音乐")
![添加音乐](readme_img/03_添加音乐_02.png "添加音乐")
![效果](readme_img/03_添加音乐_03.png "效果")
#### 修改音乐
![修改音乐](readme_img/04_修改音乐.png "修改音乐")



## 路由设计

```
GET    /                 渲染首页index.html
GET    /musicList        发送音乐列表数据
GET    /add              渲染添加音乐页面add.html
POST   /add              处理添加音乐请求
GET    /edit?id=xxx      渲染编辑音乐页面edit.html
POST   /edit?id=xxx      处理编辑音乐请求
GET    /remove?id=xxx    处理删除音乐请求
```


### 将代码按功能划分
```
GET    /musicList   从数据库获取数据，渲染页面
GET    /add              渲染添加音乐页面add.html
POST   /add              处理添加音乐请求
GET    /edit?id=xxx      渲染编辑音乐页面edit.html
POST   /edit?id=xxx      处理编辑音乐请求
GET    /remove?id=xxx    处理删除音乐请求
播放音乐
``` 

### 备注
- 数据库id存什么？
数据库开发过程中的一个原则是不应该使用主键来储存“内容”。URL地址并不唯一，可能出现“?”或者“&”甚至于引号等非常规字符，有些字符在改写为URL时还会被转译（例如人民→“%E4%BA%BA%E6%B0%91”），并且有些网站会在URL中添加无意义的随机字符。这些情况使得储存URL的字段会发生重复、不可索引、空值的情况，应当极力避免。应该使用主键来储存“索引”，例如学生的学号，职员的工号，居民身份证号码等等唯一的字符串。如果在设计数据表的过程中并没有符合作为索引的字段，可以专门设置一个自增字段用来作为主键类型int，勾选Auto Increase选项）


### TODO

1. 选择本地图片操作反应有些慢
2. 首页点击播放，音乐已经开始播放了，但是页面图标并没有改变



