import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateSubscriptionUseCase } from './update-subscription-use-case'

class UpdateSubscriptionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      price,
      descriptionc,
      duration,
      status
    } = request.body

    const { id } = request.params

    const updateSubscriptionUseCase = container.resolve(UpdateSubscriptionUseCase)

    const result = await updateSubscriptionUseCase.execute({
        id,
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

export { UpdateSubscriptionController }
