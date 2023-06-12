import createHttpError from 'http-errors'
import Team, { ITeam } from 'src/models/team.model'
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
