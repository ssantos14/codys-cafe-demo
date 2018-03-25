const router = require('express').Router()

router.use('/pugs', require('./pugs.router'))
router.use('/coffee', require('./coffee.router'))

module.exports = router
