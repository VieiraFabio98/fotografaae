import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteSubscriptionUseCase } from './delete-subscription-use-case'
import { ListSubscriptionUseCase } from '../list-subscription/list-subscription-use-case'

class DeleteSubscriptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteSubscriptionUseCase = container.resolve(DeleteSubscriptionUseCase)
    await deleteSubscriptionUseCase.execute(id)


    // restore list with updated records

    const listSubscriptionUseCase = container.resolve(ListSubscriptionUseCase)
    const subscriptions = await listSubscriptionUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(subscriptions)
  }
}

export { DeleteSubscriptionController }
