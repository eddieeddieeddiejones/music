const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')

const app = express()

// 静态资源服务
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')))

// 配置模板引擎
app.set('views', path.join(__dirname, 'views'))
// http://spxiaomin.github.io/github_blog/express4.x/2015/10/28/express4-one.html
// to map the EJS template engine to “.html” files
app.engine('.html', require('ejs').renderFile); 
// The default engine extension to use when omitted.
app.set('view engine', 'html')

// 配置解析普通表单post请求体
// 配置解析普通表单post请求体
// https://itbilu.com/nodejs/npm/EkDXWklVb.html#parse-node
// 引入了body-parser模块处理请求体。在上述代码中，模块会处理application/x-www-form-urlencoded、application/json两种内容格式的请求体。经过这个中间件处理后，就可以在所有路由处理器的req.body中访问请求参数。
app.use(bodyParser.urlencoded({ extended: false }))

// 加载路由系统
app.use(router)

// 也可以设置个IP，这样别人就可以访问这个IP了
// app.listen(3000, '192.168.25.80', () => {
//   console.log('server is running at port 3000.')
// })


app.listen(3000, () => {
  console.log('server is running at port 3000.')
})
