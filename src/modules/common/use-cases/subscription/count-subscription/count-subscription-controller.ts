import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountSubscriptionUseCase } from './count-subscription-use-case'

class CountSubscriptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countSubscriptionUseCase = container.resolve(CountSubscriptionUseCase)

    const subscriptionsCount = await countSubscriptionUseCase.execute({
      search: search as string
    })

    return response.status(subscriptionsCount.statusCode).json(subscriptionsCount)
  }
}

export { CountSubscriptionController }
