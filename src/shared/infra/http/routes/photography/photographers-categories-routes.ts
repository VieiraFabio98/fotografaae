import { Router } from 'express'
import { CreatePhotographerCategorieController } from '@modules/photography/use-cases/photographer-categorie/create-photographer-categorie/create-photographer-categorie-controller'
import { ListPhotographerCategorieController } from '@modules/photography/use-cases/photographer-categorie/list-photographer-categorie/list-photographer-categorie-controller'
import { CountPhotographerCategorieController } from '@modules/photography/use-cases/photographer-categorie/count-photographer-categorie/count-photographer-categorie-controller'
import { SelectPhotographerCategorieController } from '@modules/photography/use-cases/photographer-categorie/select-photographer-categorie/select-photographer-categorie-controller'
import { IdSelectPhotographerCategorieController } from '@modules/photography/use-cases/photographer-categorie/id-select-photographer-categorie/id-select-photographer-categorie-controller'
import { GetPhotographerCategorieController } from '@modules/photography/use-cases/photographer-categorie/get-photographer-categorie/get-photographer-categorie-controller'
import { UpdatePhotographerCategorieController } from '@modules/photography/use-cases/photographer-categorie/update-photographer-categorie/update-photographer-categorie-controller'
import { DeletePhotographerCategorieController } from '@modules/photography/use-cases/photographer-categorie/delete-photographer-categorie/delete-photographer-categorie-controller'
import { MultiDeletePhotographerCategorieController } from '@modules/photography/use-cases/photographer-categorie/multi-delete-photographer-categorie/multi-delete-photographer-categorie-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const photographersCategoriesRoutes = Router()

const createPhotographerCategorieController = new CreatePhotographerCategorieController()
const listPhotographerCategorieController = new ListPhotographerCategorieController()
const countPhotographerCategorieController = new CountPhotographerCategorieController()
const selectPhotographerCategorieController = new SelectPhotographerCategorieController()
const idSelectPhotographerCategorieController = new IdSelectPhotographerCategorieController()
const getPhotographerCategorieController = new GetPhotographerCategorieController()
const updatePhotographerCategorieController = new UpdatePhotographerCategorieController()
const deletePhotographerCategorieController = new DeletePhotographerCategorieController()
const multiDeletePhotographerCategorieController = new MultiDeletePhotographerCategorieController()

photographersCategoriesRoutes.post('/', ensureAuthenticated, createPhotographerCategorieController.handle)
photographersCategoriesRoutes.post('/list', ensureAuthenticated, listPhotographerCategorieController.handle)
photographersCategoriesRoutes.post('/count', ensureAuthenticated, countPhotographerCategorieController.handle)
photographersCategoriesRoutes.get('/select/:id', ensureAuthenticated, idSelectPhotographerCategorieController.handle)
photographersCategoriesRoutes.get('/select', ensureAuthenticated, selectPhotographerCategorieController.handle)
photographersCategoriesRoutes.get('/:id', ensureAuthenticated, getPhotographerCategorieController.handle)
photographersCategoriesRoutes.put('/:id', ensureAuthenticated, updatePhotographerCategorieController.handle)
photographersCategoriesRoutes.delete('/:id', ensureAuthenticated, deletePhotographerCategorieController.handle)
photographersCategoriesRoutes.delete('/', ensureAuthenticated, multiDeletePhotographerCategorieController.handle)

export { photographersCategoriesRoutes }
