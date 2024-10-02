import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteSubscriptionUseCase } from './multi-delete-subscription-use-case'
import { ListSubscriptionUseCase } from '../list-subscription/list-subscription-use-case'

class MultiDeleteSubscriptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteSubscriptionUseCase = container.resolve(MultiDeleteSubscriptionUseCase)
    await multiDeleteSubscriptionUseCase.execute(ids)


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

export { MultiDeleteSubscriptionController }
