const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const utils = require('./utils')
const jwt = require('jsonwebtoken')
const config = require('./config')

// create a new server process
const app = express()

// add the middle-wares

// allow all incoming requests
app.use(cors('*'))

// enable logging
app.use(morgan('combined'))

// enable static routing
app.use(express.static('images'))

// parse the request body
app.use(express.json())

// add middleware to authorize the user using token
app.use((request, response, next) => {
  // skip checking token for signup and signin apis
  if (request.url === '/user/signin' || request.url === '/user/signup') {
    next()
  } else {
    const token = request.headers['x-token']
    if (!token || token.length === 0) {
      response.send(utils.createErrorResult('token is missing'))
    } else {
      // check if the token is valid
      try {
        const payload = jwt.verify(token, config.secret)

        // add the payload details (id, first name and last name)
        request.user = payload
        next()
      } catch (ex) {
        response.send(utils.createErrorResult('invalid token'))
      }
    }
  }
})

// add the application routes
const userRouter = require('./routes/user')

app.use('/user', userRouter)

// start listening on port 4000
app.listen(4000, () => {
  console.log('server started on port 4000')
})
