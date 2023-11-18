const express = require('express')
const router = express.Router()

const logsController = require('../controllers/logs')

// GET SEGUIMENTS
router.get('/', logsController.getAllLogs)

// GET SEGUIMENT BY ID
router.get('/:id', logsController.getLogsById)

// POST SEGUIMENTS
router.post('/', logsController.postLogs)

module.exports = router