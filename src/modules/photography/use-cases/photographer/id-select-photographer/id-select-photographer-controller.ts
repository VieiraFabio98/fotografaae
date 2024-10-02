import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectPhotographerUseCase } from './id-select-photographer-use-case'

class IdSelectPhotographerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectPhotographerUseCase = container.resolve(IdSelectPhotographerUseCase)

    const photographer = await idSelectPhotographerUseCase.execute({
      id: id as string
    })

    return response.json(photographer.data)
  }
}

export { IdSelectPhotographerController }
