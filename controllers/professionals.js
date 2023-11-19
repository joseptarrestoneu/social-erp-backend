const ProfessionalModel = require('../models/Professional')

// GET ALL PROFESSIONALS
const getAllProfessionals = (request, response) => {
    ProfessionalModel.find({}).then(professionals => {
        response.json(professionals)
    })
}

// GET PROFESSIONAL BY ID
const getProfessionById = (request, response) => {
    const { id } = request.params;
    ProfessionalModel.findById(id).then(professional => {
        if (professional) {
            return response.json(professional)
        } else {
            response.status(404).end()
        }
    }).catch(err => {
        next(err)
    })
}

// POST PROFESSIONAL 
const postProfessional = (request, response) => {
    const body = request.body
       
    if (!body.professionalDNI) {
        return response.status(400).json({
            error: "user name missing"
        })
    }
    
    const newProfessional = new ProfessionalModel({
        professionalName: body.professionalName,
        professionalFirstName: body.professionalFirstName,
        professionalLastName: body.professionalLastName,
        professionalDNI: body.professionalDNI,
        professionalRol: body.professionalRol,
        professionalUser: body.professionalUser,
        professionalPassword: body.professionalPassword,
        professionalEmail: body.professionalEmail,
        professionalDate: body.professionalDate,
        professionalState: body.professionalState
    })

    newProfessional.save().then(savedProfessional => {
        response.json(savedProfessional)
    })
}

// PUT PROFESSIONAL
const putProfessional = (request, response) => {
    const { id } = request.params;
    const body = request.body

    const newProfessionalInfo = {
        professionalName: body.professionalName,
        professionalFirstName: body.professionalFirstName,
        professionalLastName: body.professionalLastName,
        professionalDNI: body.professionalDNI,
        professionalRol: body.professionalRol,
        professionalUser: body.professionalUser,
        professionalPassword: body.professionalPassword,
        professionalEmail: body.professionalEmail,
        professionalDate: body.professionalDate,
        professionalState: body.professionalState
    }

    ProfessionalModel.findByIdAndUpdate(id, newProfessionalInfo, { new: true })
        .then(result => {
            response.json(result)
        })
}

// DELETE PROFESSIONAL
const deleteProfessional = (request, response) => {
    const { id } = request.params;

    ProfessionalModel.findByIdAndDelete(id).then(result => {
        response.status(204).end()
    }).catch(err => {
        next(err)
    })
}