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

router.get('/all', (request, response) => {
  const query = `select fid as id, course, sdate, edate, type, rating, uid from feedback`
  db.query(query, (error, feedback) => {
    response.send(utils.createResult(error, feedback))
  })
})

router.get('/:id', (request, response) => {
  const { id } = request.params
  const query = `select fid as id, course, sdate, edate, type, rating from feedback where uid = ?`
  db.query(query, id, (error, feedback) => {
    response.send(utils.createResult(error, feedback))
  })
})

router.post('/bycourse', (request, response) => {
  const { course, date } = request.body
  const query = `select fid as id, course, sdate, edate, type from feedback where course = ? and ? BETWEEN sdate AND edate;`
  db.query(query, [course, date], (error, result) => {
    console.log(result)
    response.send(utils.createResult(error, result))
  })
})




module.exports = router
