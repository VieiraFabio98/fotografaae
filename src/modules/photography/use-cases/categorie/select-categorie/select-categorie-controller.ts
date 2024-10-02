import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { SelectCategorieUseCase } from './select-categorie-use-case'

class SelectCategorieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { filter } = request.query

    const selectCategorieUseCase = container.resolve(SelectCategorieUseCase)

    const categories = await selectCategorieUseCase.execute({
      filter: filter as string,
    })

    return response.json(categories)
  }
}

export { SelectCategorieController }
