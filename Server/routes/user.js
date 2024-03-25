const express = require('express')
const router = express.Router()
const db = require('../db')
const cryptoJs = require('crypto-js')
const utils = require('../utils')
const jwt = require('jsonwebtoken')
const config = require('../config')
const multer = require('multer')
const upload = multer({ dest: 'images' })

router.post(
  '/upload-profile-image',
  upload.single('image'),
  (request, response) => {
    const query = `update user set profileImage = ? where id =?`
    db.query(
      query,
      [request.file.filename, request.user.id],
      (error, result) => {
        response.send(utils.createResult(error, result))
      }
    )
  }
)

router.post('/signup', (request, response) => {
  const { firstName, lastName, email, password, role } = request.body

  const encryptedPassword = String(cryptoJs.SHA1(password))
  const query = `insert into user (firstName, lastName, email, password, role) values (?, ?, ?, ?, ?)`
  db.query(
    query,
    [firstName, lastName, email, encryptedPassword, role],
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  )
})

router.post('/signin', (request, response) => {
  const { email, password } = request.body

  const encryptedPassword = String(cryptoJs.SHA1(password))
  const query = `select id, firstName, lastName, createdTime, role, course, profileImage from user where email = ? and password = ?`
  db.query(query, [email, encryptedPassword], (error, users) => {
    if (error) {
      response.send(utils.createErrorResult(error))
    } else if (users.length === 0) {
      response.send(utils.createErrorResult('user not found'))
    } else {
      const { firstName, lastName, role, course, id, createdTime, profileImage } = users[0]
      const payload = { firstName, lastName, createdTime, role, course, id }
      const token = jwt.sign(payload, config.secret)
      response.send(
        utils.createSuccessResult({
          id,
          firstName,
          lastName,
          role,
          course,
          createdTime,
          token,
          profileImage
        })
      )
    }
  })
})

router.get('/allfaculties', (request, response) => {
  const query = `select id as uid, firstName, lastName, email from user where role = "staff"`
  db.query(query, (error, user) => {
    response.send(utils.createResult(error, user))
  })
})

router.get('/allcourses', (request, response) => {
  const query = `select cid, cname from course where cid IS NOT NULL`
  db.query(query, (error, user) => {
    response.send(utils.createResult(error, user))
  })
})


module.exports = router
