import Driver from 'src/models/driver.model'
import { driverSchema } from 'src/utils/validationSchema'

exports = {
  createDriver: async (req: any, res: any, next: any) => {
    try {
      const result = await driverSchema.validateAsync(req.body)

      await Driver.create({
        ...result
      })

      res.status(201).send()
    } catch (error: any) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  },

  updateDriver: async (req: any, res: any, next: any) => {
    try {
      const result = await driverSchema.validateAsync(req.body)
    } catch (error: any) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  }
}
