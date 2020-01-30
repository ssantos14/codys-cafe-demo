const router = require('express').Router()
const {Coffee} = require('../models')

// Your code here!
// Remember that these routes are already mounted on
// /api/coffee!


router.get('/', async(req, res, next) => {
   try {
      const coffees = await Coffee.findAll()
      if (coffees) res.send(coffees)
      else res.status(404).send(`Couldn't find all coffees`)
   } catch (error) {
      next(error)
   }
})


router.get('/ingredients/:ingredientName', async (req, res, next) => {
   try {
      const requestedIngredient = req.params.ingredientName
      const allCoffee = await Coffee.findByIngredient(requestedIngredient)
      res.send(allCoffee)
   } catch (error) {
      next(error)
   }
})

router.get('/:id', async (req, res, next) => {
   try {
      const coffee = await Coffee.findById(req.params.id)
      if (coffee) res.send(coffee)
      else res.sendStatus(404)
   } catch (error) {
      next(error)
   }
})

router.post('/', async (req, res, next) => {
   try {
      const {name, ingredients} = req.body
      const newCoffee = {}
      if (name) newCoffee.name = name
      if (ingredients) newCoffee.ingredients = ingredients
      const createdDrink = await Coffee.create(newCoffee)
      res.status(201).send(createdDrink)
   } catch (error) {
      next(error)
   }
})


module.exports = router
