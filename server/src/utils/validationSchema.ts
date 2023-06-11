import Joi from 'joi'

export const driverSchema = Joi.object({
  name: Joi.string().required(),
  nationality: Joi.string().required(),
  team: Joi.string().required()
})

export const teamSchema = Joi.object({
  name: Joi.string().required()
})

export const raceSchema = Joi.object({
  name: Joi.string().required(),
  date: Joi.date().required(),
  laps: Joi.number().required()
})

export const authRegisterSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)),
  confirmPassword: Joi.ref('password')
})

export const authLoginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/))
})
