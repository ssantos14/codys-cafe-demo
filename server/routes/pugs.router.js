const router = require('express').Router()
const {Pug} = require('../models')

// Your code here!
// Remember that these routes are already mounted on
// /api/pugs!

router.get('/', async (req, res, next) => {
   try {
      const pugs = await Pug.findAll()
      if (pugs) res.send(pugs)
      else res.sendStatus(404)
   } catch (error) {
      next(error)
   }
})

router.post('/', async (req, res, next) => {
   try {
      const {name, age, biography} = req.body
      let pupperEmbryo = {}
      if (name) pupperEmbryo.name = name
      if (age) pupperEmbryo.age = age
      if (biography) pupperEmbryo.biography = biography
      const pupper = await Pug.create(pupperEmbryo)
      res.status(201).send(pupper)
   } catch (error) {
      next(error)
   }
})

router.get('/favoriteCoffee/:favoriteCoffeeName', async (req, res, next) => {
   try {
      const favoriteCoffeeName = req.params.favoriteCoffeeName
      const pugs = await Pug.findByCoffee(favoriteCoffeeName)
      res.send(pugs)
   } catch (error) {
      next(error)
   }
})

router.get('/:pugId', async (req, res, next) => {
   try {
      const id = req.params.pugId
      const pugById = await Pug.findById(id)
      if (!pugById) res.sendStatus(404)
      res.send(pugById)
   } catch (error) {
      next(error)
   }
})

router.put('/:id', async (req, res, next) => {
   try {
      const pug = await Pug.findById(req.params.id)
      if (pug) {
         await pug.update(req.body)
         res.send(pug)
      } else {
         res.sendStatus(404)
      }

      // const [numberOfAffectedRows, affectedRows] = await Pug.update(req.body, {
      //    returning: true,
      //    where: {
      //       id: req.params.id
      //    }
      // })
      // if (numberOfAffectedRows === 0) res.sendStatus(404)
      // else res.json(affectedRows[0])
   } catch (error) {
      next(error)
   }
})

router.delete('/:pugId', async (req, res, next) => {
   try {
      // const numAffectedRows = await Pug.destroy({
      //    where: {
      //      age: 7 // deletes all pugs whose age is 7
      //    }
      //  })
      const id = req.params.pugId
      const numAffectedRows = await Pug.destroy({
         where: {
            id: id
         }
      })
      if (numAffectedRows) {
         res.sendStatus(204)
      } else {
         res.sendStatus(404)
      }

      // const pug = await Pug.findById(req.params.pugId)
      // if (pug) {
      //    await pug.destroy()
      //    res.sendStatus(204)
      // } else {
      //    res.sendStatus(404)
      // }
   } catch (error) {
      next(error)
   }
})

module.exports = router
