const express = require('express')
const router = express.Router()
const handler = require('./handler')

router
  .get('/', handler.showIndex)
  .get('/musicList', handler.getMusicList)
  .get('/add', handler.showAdd)
  .post('/add', handler.doAdd)
  .get('/edit', handler.showEdit)
  .post('/edit', handler.doEdit)
  .get('/remove', handler.doRemove)

module.exports = router
