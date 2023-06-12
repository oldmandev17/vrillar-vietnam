import createHttpError from 'http-errors'
import Driver, { IDriver } from 'src/models/driver.model'
import Race, { IRace } from 'src/models/race.model'
import Team, { ITeam } from 'src/models/team.model'
import APIFeature from 'src/utils/apiFeatures'
import { addDriverToRace, raceSchema } from 'src/utils/validationSchema'

// Create race
export async function createRace(req: any, res: any, next: any) {
  try {
    // Validation race input
    const result = await raceSchema.validateAsync(req.body)
    // Create race
    await Race.create({
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
// Update race
export async function updateRace(req: any, res: any, next: any) {
  try {
    // Find race exist
    const raceExist: IRace | null = await Race.findById(req.params.id)
    // Check race exist
    if (!raceExist) throw createHttpError.NotFound('Race does not exist.')
    // Validation race input
    const result = await raceSchema.validateAsync(req.body)
    // Update race
    await Race.updateOne(
      {
        _id: req.params.id
      },
      {
        ...result,
        createByUser: req.payload.userId,
        updatedAt: Date.now()
      }
    )
    // Return status
    res.sendStatus(200)
  } catch (error: any) {
    // Return error
    if (error.isJoi === true) error.status = 422
    next(error)
  }
}
// Delete race
export async function deleteRace(req: any, res: any, next: any) {
  try {
    // Find race exist
    const raceExist: IRace | null = await Race.findById(req.params.id)
    // Check race exist
    if (!raceExist) throw createHttpError.NotFound('Race does not exist.')
    // Delete race
    await Race.deleteOne({ _id: req.params.id })
    // Return response
    res.sendStatus(204)
  } catch (error: any) {
    // Return error
    next(error)
  }
}
// Add driver to race
export async function addDriver(req: any, res: any, next: any) {
  try {
    // Find race exist
    const raceExist: IRace | null = await Race.findById(req.params.id)
    // Check race exist
    if (!raceExist) throw createHttpError.NotFound('Race does not exist.')
    // Validation add driver to race input
    const result = await addDriverToRace.validateAsync(req.body)
    // Find driver exist
    const driverExist: IDriver | null = await Driver.findById(result.id)
    // Check driver exist
    if (!driverExist) throw createHttpError.NotFound('Driver does not exist.')
    // Update driver
    await Driver.updateOne(
      { _id: result.id, year: raceExist.year },
      {
        points: driverExist.points + result.points
      }
    )
    // Find team exist
    const teamExist: ITeam | null = await Team.findById(driverExist.team)
    // Check team exist
    if (!teamExist) throw createHttpError.NotFound('Team does not exist.')
    // Update team
    await Team.updateOne(
      { _id: driverExist.team, year: raceExist.year },
      {
        points: teamExist.points + result.points
      }
    )
    // Add driver to race
    raceExist.drivers.unshift({
      ...result,
      name: driverExist.name,
      teamId: teamExist._id.toString(),
      teamName: teamExist.name
    })
    raceExist.drivers.sort((a: any, b: any) => b.points - a.points)
    // Update race
    await Race.updateOne({ _id: req.params.id }, { drivers: raceExist.drivers })
    // Return response
    res.sendStatus(200)
  } catch (error: any) {
    // Return error
    next(error)
  }
}
// Get race list
export async function getRaceList(req: any, res: any, next: any) {
  try {
    // Feature search, filter
    const apiFeatures = new APIFeature(Race.find(), req.query).search().filter()
    let races: any[] = await apiFeatures.query
    // Get length result
    const filteredCount = races.length
    // Feature sorting, pagination
    apiFeatures.sorting().pagination()
    races = await apiFeatures.query.clone()
    // Return response
    res.status(200).json({
      filteredCount,
      races
    })
  } catch (error: any) {
    // Return error
    next(error)
  }
}
// Get race detail
export async function getRaceDetail(req: any, res: any, next: any) {
  try {
    // Find race exist
    const raceExist: IRace | null = await Race.findOne({ _id: req.params.id, year: req.params.year })
    // Check race exist
    if (!raceExist) throw createHttpError.NotFound('Race does not exist.')
    // Return response
    res.status(200).json({
      races: raceExist
    })
  } catch (error: any) {
    // Return error
    next(error)
  }
}
