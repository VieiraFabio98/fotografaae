import { Router } from 'express'
import { CreateSubscriptionController } from '@modules/common/use-cases/subscription/create-subscription/create-subscription-controller'
import { ListSubscriptionController } from '@modules/common/use-cases/subscription/list-subscription/list-subscription-controller'
import { CountSubscriptionController } from '@modules/common/use-cases/subscription/count-subscription/count-subscription-controller'
import { SelectSubscriptionController } from '@modules/common/use-cases/subscription/select-subscription/select-subscription-controller'
import { IdSelectSubscriptionController } from '@modules/common/use-cases/subscription/id-select-subscription/id-select-subscription-controller'
import { GetSubscriptionController } from '@modules/common/use-cases/subscription/get-subscription/get-subscription-controller'
import { UpdateSubscriptionController } from '@modules/common/use-cases/subscription/update-subscription/update-subscription-controller'
import { DeleteSubscriptionController } from '@modules/common/use-cases/subscription/delete-subscription/delete-subscription-controller'
import { MultiDeleteSubscriptionController } from '@modules/common/use-cases/subscription/multi-delete-subscription/multi-delete-subscription-controller'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensure-authenticated'

const subscriptionsRoutes = Router()

const createSubscriptionController = new CreateSubscriptionController()
const listSubscriptionController = new ListSubscriptionController()
const countSubscriptionController = new CountSubscriptionController()
const selectSubscriptionController = new SelectSubscriptionController()
const idSelectSubscriptionController = new IdSelectSubscriptionController()
const getSubscriptionController = new GetSubscriptionController()
const updateSubscriptionController = new UpdateSubscriptionController()
const deleteSubscriptionController = new DeleteSubscriptionController()
const multiDeleteSubscriptionController = new MultiDeleteSubscriptionController()

subscriptionsRoutes.post('/', ensureAuthenticated, createSubscriptionController.handle)
subscriptionsRoutes.post('/list', ensureAuthenticated, listSubscriptionController.handle)
subscriptionsRoutes.post('/count', ensureAuthenticated, countSubscriptionController.handle)
subscriptionsRoutes.get('/select/:id', ensureAuthenticated, idSelectSubscriptionController.handle)
subscriptionsRoutes.get('/select', ensureAuthenticated, selectSubscriptionController.handle)
subscriptionsRoutes.get('/:id', ensureAuthenticated, getSubscriptionController.handle)
subscriptionsRoutes.put('/:id', ensureAuthenticated, updateSubscriptionController.handle)
subscriptionsRoutes.delete('/:id', ensureAuthenticated, deleteSubscriptionController.handle)
subscriptionsRoutes.delete('/', ensureAuthenticated, multiDeleteSubscriptionController.handle)

export { subscriptionsRoutes }
