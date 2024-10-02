import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeletePhotographerCategorieUseCase } from './multi-delete-photographer-categorie-use-case'
import { ListPhotographerCategorieUseCase } from '../list-photographer-categorie/list-photographer-categorie-use-case'

class MultiDeletePhotographerCategorieController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeletePhotographerCategorieUseCase = container.resolve(MultiDeletePhotographerCategorieUseCase)
    await multiDeletePhotographerCategorieUseCase.execute(ids)


    // restore list with updated records

    const listPhotographerCategorieUseCase = container.resolve(ListPhotographerCategorieUseCase)
    const photographersCategories = await listPhotographerCategorieUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(photographersCategories)
  }
}

export { MultiDeletePhotographerCategorieController }
