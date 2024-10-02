import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateSubscriptionUseCase } from './create-subscription-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateSubscriptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      price,
      descriptionc,
      duration,
      status
    } = request.body

    const createSubscriptionUseCase = container.resolve(CreateSubscriptionUseCase)

    const result = await createSubscriptionUseCase.execute({
        name,
        price,
        descriptionc,
        duration,
        status
      })
      .then(subscriptionResult => {
        return subscriptionResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateSubscriptionController }
