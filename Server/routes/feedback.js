const express = require('express')
const router = express.Router()
const db = require('../db')
const utils = require('../utils')


router.post('/', (request, response) => {
  const { course, sdate, edate, type, uid } = request.body
  console.log(request.body)
  const query = `insert into feedback (course, sdate, edate, type, uid) values (?, ?, ?, ?, ?)`
  db.query(query, [course, sdate, edate, type, uid], (error, feedback) => {
    response.send(utils.createResult(error, feedback))
  })
})

module.exports = router
