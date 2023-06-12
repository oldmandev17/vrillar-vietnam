import createHttpError from 'http-errors'
import Driver, { IDriver } from 'src/models/driver.model'
import { driverSchema } from 'src/utils/validationSchema'

// Create driver
export async function createDriver(req: any, res: any, next: any) {
  try {
    // Validation driver input
    const result = await driverSchema.validateAsync(req.body)
    // Create driver
    await Driver.create({
      ...result,
      createByUser: req.payload.userId
    })
    // Return response
    res.sendStatus(201)
  } catch (error: any) {
    // Return error
    if (error.isJoi === true) error.status = 422
    next(error)
  }
}
// Update driver
export async function updateDriver(req: any, res: any, next: any) {
  try {
    // Find driver exist
    const driverExist: IDriver | null = await Driver.findById(req.params.id)
    // Check driver exist
    if (!driverExist) throw createHttpError.NotFound('Driver does not exist.')
    // Validation driver input
    const result = await driverSchema.validateAsync(req.body)
    // Update driver
    await Driver.updateOne(
      {
        _id: req.params.id
      },
      {
        ...result,
        createByUser: req.payload.userId,
        updatedAt: Date.now()
      }
    )
    // Return response
    res.sendStatus(200)
  } catch (error: any) {
    // Return error
    if (error.isJoi === true) error.status = 422
    next(error)
  }
}
// Delete driver
export async function deleteDriver(req: any, res: any, next: any) {
  try {
    // Find driver exist
    const driverExist: IDriver | null = await Driver.findById(req.params.id)
    // Check driver exist
    if (!driverExist) throw createHttpError.NotFound('Driver does not exist.')
    // Delete driver
    await Driver.deleteOne({ _id: req.params.id })
    // Return response
    res.sendStatus(204)
  } catch (error: any) {
    // Return error
    next(error)
  }
}
