import createHttpError from 'http-errors'
import Driver, { IDriver, IDriverDetail } from 'src/models/driver.model'
import Race, { IRace } from 'src/models/race.model'
import APIFeature from 'src/utils/apiFeatures'
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
// Get driver list
export async function getDriverList(req: any, res: any, next: any) {
  try {
    // Feature search, filter
    const apiFeatures = new APIFeature(Driver.find(), req.query).search().filter()
    let drivers: any[] = await apiFeatures.query
    // Get length result
    const filteredCount = drivers.length
    // Feature sorting, pagination
    apiFeatures.sorting().pagination()
    drivers = await apiFeatures.query.clone()
    // Return response
    res.status(200).json({
      filteredCount,
      drivers
    })
  } catch (error: any) {
    // Return error
    next(error)
  }
}
// Get driver detail
export async function getDriverDetail(req: any, res: any, next: any) {
  try {
    // Find driver exist
    const driverExist: IDriver | null = await Driver.findOne({ _id: req.params.id, year: req.params.year })
    // Check driver exist
    if (!driverExist) throw createHttpError.NotFound('Race does not exist.')
    // Find race
    const racesExist: IRace[] = await Race.find({
      drivers: { $elemMatch: { _id: req.params.id } },
      year: req.params.year
    })
    // Declare races
    const races: IDriverDetail[] = []
    // Find driver inside race list
    for (const race of racesExist) {
      race.drivers.map((item: IDriverDetail, index: number) => {
        if (item._id.toString() === req.params.id)
          races.unshift({
            _id: item._id.toString(),
            position: index + 1,
            no: item.no,
            name: item.name,
            laps: item.laps,
            teamId: item.teamId,
            teamName: item.teamName,
            race: {
              id: race._id,
              nationality: race.nationality
            },
            time: item.time,
            points: item.points
          })
      })
    }
    // Return response
    res.status(200).json({
      races
    })
  } catch (error: any) {
    // Return error
    next(error)
  }
}
