require('dotenv').config()
require('./mongo')

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Note = require('./models/Seguiment')
const User = require('./models/User')
const Professional = require('./models/Professional')

app.use(express.json())
app.use(cors())
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.res(req, res, 'content-length'), '-',
        JSON.stringify(req.body), 
    ].join(' ')   
}))

// Usuaris
app.get('/api/users', (request, response) => {
    User.find({}).then(tasks => {
        response.json(tasks)
    })
})

app.get('/api/users/:id', (request, response, next) => {
    const { id } = request.params;
    User.findById(id).then(user => {
        if (user) {
            return response.json(user)
        } else {
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})

app.delete('/api/users/:id', (request, response, next) => {
    const { id } = request.params;

    User.findByIdAndDelete(id).then(result => {
        response.status(204).end()
    }).catch(err => {
        next(err)
    })

})

app.post('/api/users', (request, response) => {
    const body = request.body
       
    if (!body.userDNI) {
        return response.status(400).json({
            error: "DNI user missing"
        })
    }
    
    const newUser = new User({
        userName: body.userName,
        userFirstName: body.userFirstName,
        userLastName: body.userLastName,
        userDNI: body.userDNI,
        userEmail: body.userEmail,
        userDate: body.userDate,
        userState: body.userState
    })

    newUser.save().then(savedUser => {
        response.json(savedUser)
    })
  })

  app.put('/api/users/:id', (request, response, next) => {
    const { id } = request.params;
    const body = request.body
    
    const newUserInfo = {
        userName: body.userName,
        userFirstName: body.userFirstName,
        userLastName: body.userLastName,
        userDNI: body.userDNI,
        userEmail: body.userEmail,
        userDate: body.userDate,
        userState: body.userState
    }

    User.findByIdAndUpdate(id, newUserInfo, { new: true })
        .then(result => {
            response.json(result)
        })

})

// Professionals
app.get('/api/professionals', (request, response) => {
    Professional.find({}).then(professionals => {
        response.json(professionals)
    })
})

app.get('/api/professionals/:id', (request, response, next) => {
    const { id } = request.params;
    Professional.findById(id).then(professional => {
        if (professional) {
            return response.json(professional)
        } else {
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})

app.delete('/api/professionals/:id', (request, response, next) => {
    const { id } = request.params;

    Professional.findByIdAndDelete(id).then(result => {
        response.status(204).end()
    }).catch(err => {
        next(err)
    })

})

app.post('/api/professionals', (request, response) => {
    const body = request.body
       
    if (!body.professionalDNI) {
        return response.status(400).json({
            error: "user name missing"
        })
    }
    
    const newProfessional = new Professional({
        professionalName: body.professionalName,
        professionalFirstName: body.professionalFirstName,
        professionalLastName: body.professionalLastName,
        professionalDNI: body.professionalDNI,
        professionalUser: body.professionalUser,
        professionalPassword: body.professionalPassword,
        professionalEmail: body.professionalEmail,
        professionalDate: body.professionalDate,
        professionalState: body.professionalState
    })

    newProfessional.save().then(savedProfessional => {
        response.json(savedProfessional)
    })
})

app.put('/api/professionals/:id', (request, response, next) => {
    const { id } = request.params;
    const body = request.body
    
    const newProfessionalInfo = {
        professionalName: body.professionalName,
        professionalFirstName: body.professionalFirstName,
        professionalLastName: body.professionalLastName,
        professionalDNI: body.professionalDNI,
        professionalUser: body.professionalUser,
        professionalPassword: body.professionalPassword,
        professionalEmail: body.professionalEmail,
        professionalDate: body.professionalDate,
        professionalState: body.professionalState
    }

    Professional.findByIdAndUpdate(id, newProfessionalInfo, { new: true })
        .then(result => {
            response.json(result)
        })

})

// Seguiments
app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response, next) => {
    const { id } = request.params;
    Note.findById(id).then(note => {
        if (note) {
            return response.json(note)
        } else {
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
})

app.delete('/api/notes/:id', (request, response, next) => {
    const { id } = request.params;

    Note.findByIdAndDelete(id).then(result => {
        response.status(204).end()
    }).catch(err => {
        next(err)
    })

})

app.post('/api/notes', (request, response) => {
    const body = request.body
       
    if (!body.noteBody) {
        return response.status(400).json({
            error: "note body missing"
        })
    }
    
    const newNote = new Note({
        userId: body.userId,
        professionalId: body.professionalId,
        noteBody: body.noteBody,
        noteType: body.noteType,
        noteStatus: body.noteStatus,
        noteDate: body.noteDate,
        noteHour: body.noteDate
    })

    newNote.save().then(savedNote => {
        response.json(savedNote)
    })
})

app.put('/api/notes/:id', (request, response, next) => {
    const { id } = request.params;
    const body = request.body
    
    const newNoteInfo = {
        userId: body.userId,
        professionalId: body.professionalId,
        noteBody: body.noteBody,
        noteType: body.noteType,
        noteStatus: body.noteStatus,
        noteDate: body.noteDate,
        noteHour: body.noteDate
    }

    Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
        .then(result => {
            response.json(result)
        })

})

// Middleware
app.use((error, request, response, next) => {
    console.error(error);
    if (error.name == 'CastError') {
        response.status(400).send({error: 'id used is malformed'})
    } else {
        response.status(500).end()
    }
  })
      

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Servei running on port ${PORT}`);
})

