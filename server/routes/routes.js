import express from 'express'
import * as lib from './lib.js'

const router = express.Router()

async function findBubbletea(req) {
  const { id } = req.params
  const bubbleteaFile = await lib.getFile()
  return bubbleteaFile.bubbleteas.find((element) => element.id == id)
}

// Routes
// Home (/) > 'check our menu' button
// Menu (/menu)
// Details (/:id) > get
// Details (/:id) > post
// Order complete (/ordersent) > get

router.get('/menu', async (req, res) => {
  const teas = await lib.getFile() // object
  const bubbleTeas = teas['bubbleteas'] // array
  // console.log(`Teas: ${teas}`)
  // console.log(`Bubbleteas: ${teas['bubbleteas']}`)
  const viewData = {
    teas: bubbleTeas,
  }
  res.render('menu', viewData)
})

router.get('/:id', async (req, res) => {
  const bubbletea = await findBubbletea(req)
  res.render('details', bubbletea)
})

router.post('/:id', async (req, res) => {
  const puppy = await findPuppy(req)
  res.render('edit', puppy)
})

router.get('/ordersent', (req, res) => {
  res.render('order-sent')
})

router.post('/:id/edit', async (req, res) => {
  const { id } = req.params
  const puppiesFile = await lib.getFile()
  const puppy = await findPuppy(req)

  puppy.name = req.body.name
  puppy.breed = req.body.breed
  puppy.owner = req.body.owner

  puppiesFile.puppies.splice(puppy.id - 1, 1, puppy)
  await lib.updateFile(puppiesFile)

  res.redirect(`/puppies/${id}`)
})

router.post('/add-puppy', async (req, res) => {
  const puppiesFile = await lib.getFile()
  const newPuppy = {
    id: puppiesFile.puppies.length + 1,
    name: req.body.name,
    owner: req.body.owner,
    image: req.body.image,
    breed: req.body.breed,
  }

  puppiesFile.puppies.push(newPuppy)
  await lib.updateFile(puppiesFile)

  const viewData = {
    visible: 'visible',
  }
  res.render('add-puppy', viewData)
})

export default router
