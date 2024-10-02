import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetPhotographerUseCase } from './get-photographer-use-case'

class GetPhotographerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getPhotographerUseCase = container.resolve(GetPhotographerUseCase)
    const photographer = await getPhotographerUseCase.execute(id)

    return response.status(photographer.statusCode).json(photographer.data)
  }
}

export { GetPhotographerController }
