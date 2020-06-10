import express from 'express'
import ItemsController from './controllers/ItemsController'
import PointsController from './controllers/PointsController'
import { celebrate, Joi } from 'celebrate'
import multer from 'multer'
import multerConfig from './config/multer'

const routes = express.Router()
const itensController = new ItemsController
const pointsController = new PointsController
const upload = multer(multerConfig)

routes.get("/items", itensController.index)

routes.get("/points/:id", pointsController.show)

routes.get("/points", pointsController.index)

routes.post("/points",
upload.single('image'),
celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
    })
}, {
    abortEarly: false
}),
pointsController.create)

export default routes