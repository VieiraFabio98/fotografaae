import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListSubscriptionUseCase } from './list-subscription-use-case'

class ListSubscriptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listSubscriptionUseCase = container.resolve(ListSubscriptionUseCase)

    const subscriptions = await listSubscriptionUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(subscriptions)
  }
}

export { ListSubscriptionController }
