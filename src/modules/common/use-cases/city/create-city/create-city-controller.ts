import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateCityUseCase } from './create-city-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateCityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      stateId,
      name
    } = request.body

    const createCityUseCase = container.resolve(CreateCityUseCase)

    const result = await createCityUseCase.execute({
        stateId,
        name
      })
      .then(cityResult => {
        return cityResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateCityController }
