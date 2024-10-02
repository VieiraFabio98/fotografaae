import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetSubscriptionUseCase } from './get-subscription-use-case'

class GetSubscriptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getSubscriptionUseCase = container.resolve(GetSubscriptionUseCase)
    const subscription = await getSubscriptionUseCase.execute(id)

    return response.status(subscription.statusCode).json(subscription.data)
  }
}

export { GetSubscriptionController }
