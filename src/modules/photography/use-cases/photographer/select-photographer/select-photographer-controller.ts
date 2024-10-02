import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectPhotographerUseCase } from './select-photographer-use-case'

class SelectPhotographerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectPhotographerUseCase = container.resolve(SelectPhotographerUseCase)

    const photographers = await selectPhotographerUseCase.execute({
      filter: filter as string,
    })

    return response.json(photographers)
  }
}

export { SelectPhotographerController }
