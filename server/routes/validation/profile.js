import Joi from 'joi'

export default {
  update: {
    body: {
      firstName: Joi.string().allow(''),
      lastName: Joi.string().allow(''),
      phone: Joi.string().allow(''),
      shipAddress: {
        street: Joi.string().allow(''),
        streetNumber: Joi.string().allow(''),
        entrance: Joi.string().allow(''),
        level: Joi.string().allow(''),
        apartment: Joi.string().allow(''),
        entranceCode: Joi.string().allow('')
      }
    }
  },
  create: {
    body: {
      firstName: Joi.string().allow(''),
      lastName: Joi.string().allow(''),
      phone: Joi.string().allow(''),
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    }
  },
  login: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    }
  }
}