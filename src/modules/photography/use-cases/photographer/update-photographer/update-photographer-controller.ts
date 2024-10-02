import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdatePhotographerUseCase } from './update-photographer-use-case'

class UpdatePhotographerController {
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

    const { id } = request.params

    const updatePhotographerUseCase = container.resolve(UpdatePhotographerUseCase)

    const result = await updatePhotographerUseCase.execute({
        id,
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

export { UpdatePhotographerController }
