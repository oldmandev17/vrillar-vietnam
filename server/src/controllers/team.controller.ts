import createHttpError from 'http-errors'
import { IDriverDetail } from 'src/models/driver.model'
import Race, { IRace } from 'src/models/race.model'
import Team, { ITeam, ITeamDetail } from 'src/models/team.model'
import APIFeature from 'src/utils/apiFeatures'
import { teamSchema } from 'src/utils/validationSchema'

// Create team
export async function createTeam(req: any, res: any, next: any) {
  try {
    // Validation team input
    const result = await teamSchema.validateAsync(req.body)
    // Create team
    await Team.create({
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
// Update team
export async function updateTeam(req: any, res: any, next: any) {
  try {
    // Find team exist
    const teamExist: ITeam | null = await Team.findById(req.params.id)
    // Check team exist
    if (!teamExist) throw createHttpError.NotFound('Team does not exist.')
    // Validation team input
    const result = await teamSchema.validateAsync(req.body)
    // Update team
    await Team.updateOne(
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
// Delete team
export async function deleteTeam(req: any, res: any, next: any) {
  try {
    // Find team exist
    const teamExist: ITeam | null = await Team.findById(req.params.id)
    // Check team exist
    if (!teamExist) throw createHttpError.NotFound('Team does not exist.')
    // Delete team
    await Team.deleteOne({ _id: req.params.id })
    // Return response
    res.sendStatus(204)
  } catch (error: any) {
    // Return error
    next(error)
  }
}
// Get team list
export async function getTeamList(req: any, res: any, next: any) {
  try {
    // Feature search, filter
    const apiFeatures = new APIFeature(Team.find(), req.query).search().filter()
    let teams: any[] = await apiFeatures.query
    // Get length result
    const filteredCount = teams.length
    // Feature sorting, pagination
    apiFeatures.sorting().pagination()
    teams = await apiFeatures.query.clone()
    // Return response
    res.status(200).json({
      filteredCount,
      teams
    })
  } catch (error: any) {
    // Return error
    next(error)
  }
}
// Get team detail
export async function getTeamDetail(req: any, res: any, next: any) {
  try {
    // Find team exist
    const teamExist: ITeam | null = await Team.findOne({ _id: req.params.id, year: req.params.year })
    // Check team exist
    if (!teamExist) throw createHttpError.NotFound('Race does not exist.')
    // Find race
    const racesExist: IRace[] = await Race.find({
      drivers: { $elemMatch: { teamId: req.params.id } },
      year: req.params.year
    })
    // Declare races
    const races: ITeamDetail[] = []
    // Find team inside race list
    for (const race of racesExist) {
      race.drivers.map((item: IDriverDetail, index: number) => {
        if (item.teamId.toString() === req.params.id) {
          // Find race exist
          const raceExist: ITeamDetail[] = races.filter((item: any) => (item.id = req.params.id))
          // Check race exist
          if (raceExist.length === 0)
            races.unshift({
              id: item.teamId.toString(),
              race: {
                id: race._id,
                nationality: race.nationality
              },
              date: race.date,
              points: item.points
            })
          else
            races.map((itemExist: ITeamDetail, index: number) => {
              // Total points
              if (itemExist.id === req.params.id) itemExist.points += item.points
            })
        }
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
