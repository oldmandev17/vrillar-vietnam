import { Router } from 'express'
import {
  addDriver,
  createRace,
  deleteRace,
  getRaceDetail,
  getRaceList,
  updateRace
} from 'src/controllers/race.controller'
import { authorizeRoles, verifyAccessToken } from 'src/middlewares/jwtHelper'

const raceRouter = Router()
// Create race with user role equal admin: .../race/create with input req.body include name, nationality, date and laps field
raceRouter.route('/create').post(verifyAccessToken, authorizeRoles('admin'), createRace)
// Update race with user role equal admin: .../race/update/:id with input req.body include name, nationality, date and laps field and req.params include id
raceRouter.route('/update/:id').post(verifyAccessToken, authorizeRoles('admin'), updateRace)
// Delete race with user role equal admin: .../race/delete/:id with input req.params include id
raceRouter.route('/delete/:id').delete(verifyAccessToken, authorizeRoles('admin'), deleteRace)
// Add driver with user role equal admin: .../race/add-driver/:id with input req.body include id, no, laps, time and points field and req.params include id
raceRouter.route('/add-driver/:id').post(verifyAccessToken, authorizeRoles('admin'), addDriver)
// Get race list: .../race/list
raceRouter.route('/list').get(getRaceList)
// Get race detail: .../race/detail/:id with input req.params include id and year
raceRouter.route('/detail/:year/:id').get(getRaceDetail)
// Return race router
export default raceRouter
