const express = require('express')
const router = express.Router()
const db = require('../db')
const utils = require('../utils')

router.post('/:fid', (request, response) => {
  const { fid } = request.params
  const { Punctuality, queries_solved, Initiative, responsiveness, total} = request.body
  const query = `insert into tfeedback (fid, sid, Punctuality, queries_solved, Initiative, responsiveness, total) values(?, ?, ?, ?, ?, ?, ?)`
  db.query(query, [fid, request.user.id, Punctuality, queries_solved, Initiative, responsiveness, total], (error, feedback) => {
    response.send(utils.createResult(error, feedback))
  })
})


module.exports = router