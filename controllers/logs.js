const LogsModel = require('../models/Logs')

// GET ALL LOGS
const getAllLogs = (request, response) => {
    LogsModel.find({}).populate('professionalId')
    .then(logs => {
        response.json(logs)
    })
}

// GET LOGS BY ID
const getLogById = (request, response) => {
    const { id } = request.params;
    LogsModel.findById(id)
    .then(logs => {
        if (logs) {
            return response.json(logs)
        } else {
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
}

// POST LOG 
const postLog = (request, response) => {
    const body = request.body
       
    const newLog = new LogsModel({
        logDate: new Date(),
        professionalId: body.professionalId,
        logAction: body.logAction,
    })

    newLog.save().then(savedLog => {
        response.json(savedLog)
    })
}