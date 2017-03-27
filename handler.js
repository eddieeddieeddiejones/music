const formidable = require('formidable')
const config = require('./config')
const db = require('./common/db')
const path = require('path')

exports.showIndex = (req, res) => {
  res.render('index')
}

exports.getMusicList = (req, res) => {
  db.query('SELECT * FROM music', (err, rows) => {
    if (err) {
      throw err
    }
    console.log(rows)
    // 返回一个 JSON 响应
    res.json({
      list: rows
    })
  })
}

exports.showAdd = (req, res) => {
  res.render('add')
}

exports.doAdd = (req, res) => {
  const form = new formidable.IncomingForm()
  form.uploadDir = config.uploadDir // 配置上传文件的路径
  form.keepExtensions = true // 保持扩展名
  form.maxFieldsSize = 20 * 1024 * 1024 // 配置上传文件的大小
  form.parse(req, (err, fields, files) => {
    if (err) {
      throw err
    }
    // 回调函数中的 fields 就是表单中的普通字段
    // files 就是文件信息
    // { title: 'dg', singer: 'hf' }
    // {{music},{img}}
    // console.log(fields)
    // console.log(files)
    const title = fields.title
    const singer = fields.singer
    // F:\05-work\02-codePackage\10BasicalNode\07-Node基础-第7天-2016年10月25日-{Mysql基本使用、sql语句、数据增删改、留言本、网页
    // 版音乐播放器}\musicMyAnalysis\uploads\upload_8aab3ac004b7290f6bccc04953283409.mp3
    // console.log(files.music.path)
    const music = path.basename(files.music.path)
    // upload_8aab3ac004b7290f6bccc04953283409.mp3
    // console.log(music)
    const img = path.basename(files.img.path)
    db.query('INSERT INTO music(title, singer, music, img) VALUES(?, ?, ?, ?)', [
      title,
      singer,
      music,
      img
    ], (err, rows) => {
      if (err) {
        throw err
      }
      res.redirect('/')
    })
  })
}

exports.showEdit = (req, res) => {
  const id = req.query.id
  // console.log(id)
  // 按id查询数据库
  db.query('SELECT * FROM music WHERE id=?', [id], (err, rows) => {
    if (err) {
      throw err
    }
    /*[ RowDataPacket {
        id: '1',
        title: '女儿情',
        singer: '万晓利',
        music: 'upload_3c7892ecbd4d0a34945f75f92cc4a9d9.mp3',
        img: 'upload_ae4f4136e27689b81be6d326b7703dc9.jpg' } ]*/
    // console.log(rows)
    res.render('edit', {
      music: rows[0]
    })
  })
}

exports.doEdit = (req, res) => {
  // { id: '5' }
  // console.log(req.query)
  // { title: 'dgf', singer: '电话' }
  // console.log(req.body)
  const id = req.query.id
  const title = req.body.title
  const singer = req.body.singer
  // 数据存入数据库之前，一定要做数据安全校验
  // 更新数据库中id为id那一行的数据
  db.query('UPDATE music SET title=?, singer=? WHERE id=?', [
    title, singer, id
  ], (err, rows) => {
    if (err) {
      throw err
    }
    if (rows.affectedRows !== 1) {
      return res.json({
        code: 2001,
        msg: 'update failed'
      })
    }
    res.json({
      code: 2000,
      msg: 'uploads success'
    })
  })
}

exports.doRemove = (req, res) => {
  const id = req.query.id
  db.query('DELETE FROM music WHERE id=?', [id], (err, rows) => {
    if (err) {
      throw err
    }
    if (rows.affectedRows !== 1) {
      // 删除歌曲
      // 1000
      // 1001
      return res.json({
        code: 1001,
        msg: 'remove failed'
      })
    }
    res.json({
      code: 1000,
      msg: 'remove success'
    })
  })
}
