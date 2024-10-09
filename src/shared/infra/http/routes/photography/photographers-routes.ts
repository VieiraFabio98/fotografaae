import { Router } from 'express'
import { CreatePhotographerController } from '@modules/photography/use-cases/photographer/create-photographer/create-photographer-controller'
import { ListPhotographerController } from '@modules/photography/use-cases/photographer/list-photographer/list-photographer-controller'
import { CountPhotographerController } from '@modules/photography/use-cases/photographer/count-photographer/count-photographer-controller'
import { SelectPhotographerController } from '@modules/photography/use-cases/photographer/select-photographer/select-photographer-controller'
import { IdSelectPhotographerController } from '@modules/photography/use-cases/photographer/id-select-photographer/id-select-photographer-controller'
import { GetPhotographerController } from '@modules/photography/use-cases/photographer/get-photographer/get-photographer-controller'
import { UpdatePhotographerController } from '@modules/photography/use-cases/photographer/update-photographer/update-photographer-controller'
import { DeletePhotographerController } from '@modules/photography/use-cases/photographer/delete-photographer/delete-photographer-controller'
import { MultiDeletePhotographerController } from '@modules/photography/use-cases/photographer/multi-delete-photographer/multi-delete-photographer-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const photographersRoutes = Router()

const createPhotographerController = new CreatePhotographerController()
const listPhotographerController = new ListPhotographerController()
const countPhotographerController = new CountPhotographerController()
const selectPhotographerController = new SelectPhotographerController()
const idSelectPhotographerController = new IdSelectPhotographerController()
const getPhotographerController = new GetPhotographerController()
const updatePhotographerController = new UpdatePhotographerController()
const deletePhotographerController = new DeletePhotographerController()
const multiDeletePhotographerController = new MultiDeletePhotographerController()

photographersRoutes.post('/', createPhotographerController.handle)
photographersRoutes.post('/list', ensureAuthenticated, listPhotographerController.handle)
photographersRoutes.post('/count', ensureAuthenticated, countPhotographerController.handle)
photographersRoutes.get('/select/:id', ensureAuthenticated, idSelectPhotographerController.handle)
photographersRoutes.get('/select', ensureAuthenticated, selectPhotographerController.handle)
photographersRoutes.get('/:id', ensureAuthenticated, getPhotographerController.handle)
photographersRoutes.put('/:id', ensureAuthenticated, updatePhotographerController.handle)
photographersRoutes.delete('/:id', ensureAuthenticated, deletePhotographerController.handle)
photographersRoutes.delete('/', ensureAuthenticated, multiDeletePhotographerController.handle)

export { photographersRoutes }
