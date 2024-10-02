import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectSubscriptionUseCase } from './id-select-subscription-use-case'

class IdSelectSubscriptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectSubscriptionUseCase = container.resolve(IdSelectSubscriptionUseCase)

    const subscription = await idSelectSubscriptionUseCase.execute({
      id: id as string
    })

    return response.json(subscription.data)
  }
}

export { IdSelectSubscriptionController }
