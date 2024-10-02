import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectSubscriptionUseCase } from './select-subscription-use-case'

class SelectSubscriptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectSubscriptionUseCase = container.resolve(SelectSubscriptionUseCase)

    const subscriptions = await selectSubscriptionUseCase.execute({
      filter: filter as string,
    })

    return response.json(subscriptions)
  }
}

export { SelectSubscriptionController }
