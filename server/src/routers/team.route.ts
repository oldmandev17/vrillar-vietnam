import { Router } from 'express'
import { createTeam, deleteTeam, getTeamDetail, getTeamList, updateTeam } from 'src/controllers/team.controller'
import { authorizeRoles, verifyAccessToken } from 'src/middlewares/jwtHelper'

const teamRouter = Router()
// Create team with user role equal admin: .../team/create with input req.body include name and year field
teamRouter.route('/create').post(verifyAccessToken, authorizeRoles('admin'), createTeam)
// Update team with user role equal admin: .../team/update/:id with input req.body include name and year field and req.params include id
teamRouter.route('/update/:id').post(verifyAccessToken, authorizeRoles('admin'), updateTeam)
// Delete team with user role equal admin: .../team/delete/:id with input req.params include id
teamRouter.route('/delete/:id').delete(verifyAccessToken, authorizeRoles('admin'), deleteTeam)
// Get team list: .../team/list
teamRouter.route('/list').get(getTeamList)
// Get team detail: .../team/detail/:id with input req.params include id and year
teamRouter.route('/detail/:year/:id').get(getTeamDetail)
// Return team router
export default teamRouter
