import Joi from 'joi'

// Validation model driver input
export const driverSchema = Joi.object({
  name: Joi.string().required(),
  nationality: Joi.string().required(),
  team: Joi.string().required(),
  year: Joi.string().required()
})
// Validation model team input
export const teamSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.string().required()
})
// Validation model race input
export const raceSchema = Joi.object({
  name: Joi.string().required(),
  nationality: Joi.string().required(),
  date: Joi.string().required(),
  description: Joi.string().required(),
  laps: Joi.number().required(),
  year: Joi.string().required()
})
// Validation model user register input
export const authRegisterSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)),
  confirmPassword: Joi.ref('password')
})
// Validation model user login input
export const authLoginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/))
})
// Validation model add driver to race
export const addDriverToRace = Joi.object({
  id: Joi.string().required(),
  no: Joi.number().required(),
  laps: Joi.string().required(),
  time: Joi.string().required(),
  points: Joi.number().required()
})
