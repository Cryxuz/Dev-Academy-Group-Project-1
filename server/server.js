import * as Path from 'node:path'
// import * as URL from 'node:url'
// import fs from 'node:fs/promises'

import express from 'express'
import hbs from 'express-handlebars'
import * as lib from './routes/lib.js'

import puppyRoutes from './routes/routes.js'

const server = express()

// Server configuration
const publicFolder = Path.resolve('public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', Path.resolve('server/views'))

// Your routes/router(s) should go here
server.get('/', async (req, res) => {
  const puppies = await lib.getFile()
  res.render('home', puppies)
})

server.use('/puppies', puppyRoutes)

export default server
