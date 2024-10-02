import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateStateUseCase } from './create-state-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateStateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      code
    } = request.body

    const createStateUseCase = container.resolve(CreateStateUseCase)

    const result = await createStateUseCase.execute({
        name,
        code
      })
      .then(stateResult => {
        return stateResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateStateController }
