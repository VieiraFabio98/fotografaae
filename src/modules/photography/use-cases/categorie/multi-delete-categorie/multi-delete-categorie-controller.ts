import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeleteCategorieUseCase } from './multi-delete-categorie-use-case'
import { ListCategorieUseCase } from '../list-categorie/list-categorie-use-case'

class MultiDeleteCategorieController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeleteCategorieUseCase = container.resolve(MultiDeleteCategorieUseCase)
    await multiDeleteCategorieUseCase.execute(ids)


    // restore list with updated records

    const listCategorieUseCase = container.resolve(ListCategorieUseCase)
    const categories = await listCategorieUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(categories)
  }
}

export { MultiDeleteCategorieController }
