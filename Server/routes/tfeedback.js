const express = require('express')
const router = express.Router()
const db = require('../db')
const utils = require('../utils')

router.post('/:fid', (request, response) => {
  const { fid } = request.params
  const { Punctuality, queries_solved, Initiative, responsiveness} = request.body
  const query = `insert into tfeedback (fid, sid, Punctuality, queries_solved, Initiative, responsiveness) values(?, ?, ?, ?, ?, ?)`
  db.query(query, [fid, request.user.id, Punctuality, queries_solved, Initiative, responsiveness], (error, feedback) => {
    response.send(utils.createResult(error, feedback))
  })
})

module.exports = router
