const express = require('express')
const router = express.Router()
const db = require('../db')
const cryptoJs = require('crypto-js')
const utils = require('../utils')
const jwt = require('jsonwebtoken')
const config = require('../config')
const multer = require('multer')

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

module.exports = router
