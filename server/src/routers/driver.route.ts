import { Router } from 'express'
import {
  createDriver,
  deleteDriver,
  getDriverDetail,
  getDriverList,
  updateDriver
} from 'src/controllers/driver.controller'
import { authorizeRoles, verifyAccessToken } from 'src/middlewares/jwtHelper'

const driverRouter = Router()
// Create driver with user role equal admin: .../driver/create with input req.body include name, nationality, team and year field
driverRouter.route('/create').post(verifyAccessToken, authorizeRoles('admin'), createDriver)
// Update driver with user role equal admin: .../driver/update/:id with input req.body include name, nationality, team and year field and req.params include id
driverRouter.route('/update/:id').post(verifyAccessToken, authorizeRoles('admin'), updateDriver)
// Delete driver with user role equal admin: .../driver/delete/:id with input req.params include id
driverRouter.route('/delete/:id').delete(verifyAccessToken, authorizeRoles('admin'), deleteDriver)
// Get driver list: .../driver/list
driverRouter.route('/list').get(getDriverList)
// Get driver detail: .../driver/detail/:id with input req.params include id and year
driverRouter.route('/detail/:year/:id').get(getDriverDetail)
// Return driver router
export default driverRouter
