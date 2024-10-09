import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreatePhotographerUseCase } from './create-photographer-use-case'
import { HttpResponse } from '@shared/helpers'

class CreatePhotographerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      lastName,
      cpf,
      email,
      telephone,
      photos,
      description,
      subscriptionId,
      status,
      categories
    } = request.body

    const createPhotographerUseCase = container.resolve(CreatePhotographerUseCase)

    const result = await createPhotographerUseCase.execute({
        name,
        lastName,
        cpf,
        email,
        telephone,
        photos,
        description,
        subscriptionId,
        status,
        categories
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
