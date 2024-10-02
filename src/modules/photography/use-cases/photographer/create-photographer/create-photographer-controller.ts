import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreatePhotographerUseCase } from './create-photographer-use-case'
import { HttpResponse } from '@shared/helpers'

class CreatePhotographerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      cpf,
      email,
      telephone,
      photos,
      subscriptionId,
      year,
      status
    } = request.body

    const createPhotographerUseCase = container.resolve(CreatePhotographerUseCase)

    const result = await createPhotographerUseCase.execute({
        name,
        cpf,
        email,
        telephone,
        photos,
        subscriptionId,
        year,
        status
      })
      .then(photographerResult => {
        return photographerResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreatePhotographerController }
