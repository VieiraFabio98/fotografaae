import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectPhotographerCategorieUseCase } from './select-photographer-categorie-use-case'

class SelectPhotographerCategorieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectPhotographerCategorieUseCase = container.resolve(SelectPhotographerCategorieUseCase)

    const photographersCategories = await selectPhotographerCategorieUseCase.execute({
      filter: filter as string,
    })

    return response.json(photographersCategories)
  }
}

export { SelectPhotographerCategorieController }
