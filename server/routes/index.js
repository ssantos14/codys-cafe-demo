const router = require('express').Router()

// don't forget that these are already mounted on /api!
router.use('/pugs', require('./pugs.router'))

module.exports = router
