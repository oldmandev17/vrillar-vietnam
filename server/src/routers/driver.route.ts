import { Router } from 'express'
import { createDriver, deleteDriver, updateDriver } from 'src/controllers/driver.controller'
import { authorizeRoles, verifyAccessToken } from 'src/middlewares/jwtHelper'

const driverRouter = Router()
// Create driver with user role equal admin: .../driver/create with input req.body include name, nationality, team and year field
driverRouter.route('/create').post(verifyAccessToken, authorizeRoles('admin'), createDriver)
// Update driver with user role equal admin: .../driver/update/:id with input req.body include name, nationality, team and year field and req.params include id
driverRouter.route('/update/:id').post(verifyAccessToken, authorizeRoles('admin'), updateDriver)
// Delete driver with user role equal admin: .../driver/delete/:id with input req.params include id
driverRouter.route('/delete/:id').delete(verifyAccessToken, authorizeRoles('admin'), deleteDriver)
// Return driver router
export default driverRouter
