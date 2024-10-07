import { Router } from 'express'
import { CreateCategorieController } from '@modules/photography/use-cases/categorie/create-categorie/create-categorie-controller'
import { ListCategorieController } from '@modules/photography/use-cases/categorie/list-categorie/list-categorie-controller'
import { CountCategorieController } from '@modules/photography/use-cases/categorie/count-categorie/count-categorie-controller'
import { SelectCategorieController } from '@modules/photography/use-cases/categorie/select-categorie/select-categorie-controller'
import { IdSelectCategorieController } from '@modules/photography/use-cases/categorie/id-select-categorie/id-select-categorie-controller'
import { GetCategorieController } from '@modules/photography/use-cases/categorie/get-categorie/get-categorie-controller'
import { UpdateCategorieController } from '@modules/photography/use-cases/categorie/update-categorie/update-categorie-controller'
import { DeleteCategorieController } from '@modules/photography/use-cases/categorie/delete-categorie/delete-categorie-controller'
import { MultiDeleteCategorieController } from '@modules/photography/use-cases/categorie/multi-delete-categorie/multi-delete-categorie-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const categoriesRoutes = Router()

const createCategorieController = new CreateCategorieController()
const listCategorieController = new ListCategorieController()
const countCategorieController = new CountCategorieController()
const selectCategorieController = new SelectCategorieController()
const idSelectCategorieController = new IdSelectCategorieController()
const getCategorieController = new GetCategorieController()
const updateCategorieController = new UpdateCategorieController()
const deleteCategorieController = new DeleteCategorieController()
const multiDeleteCategorieController = new MultiDeleteCategorieController()

categoriesRoutes.post('/', ensureAuthenticated, createCategorieController.handle)
categoriesRoutes.post('/list', ensureAuthenticated, listCategorieController.handle)
categoriesRoutes.post('/count', ensureAuthenticated, countCategorieController.handle)
categoriesRoutes.get('/select/:id', ensureAuthenticated, idSelectCategorieController.handle)
categoriesRoutes.get('/select', selectCategorieController.handle)
// categoriesRoutes.get('/select', ensureAuthenticated, selectCategorieController.handle)
categoriesRoutes.get('/:id', ensureAuthenticated, getCategorieController.handle)
categoriesRoutes.put('/:id', ensureAuthenticated, updateCategorieController.handle)
categoriesRoutes.delete('/:id', ensureAuthenticated, deleteCategorieController.handle)
categoriesRoutes.delete('/', ensureAuthenticated, multiDeleteCategorieController.handle)

export { categoriesRoutes }
