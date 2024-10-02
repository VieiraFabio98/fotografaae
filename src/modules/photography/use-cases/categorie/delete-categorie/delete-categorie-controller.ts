import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteCategorieUseCase } from './delete-categorie-use-case'
import { ListCategorieUseCase } from '../list-categorie/list-categorie-use-case'

class DeleteCategorieController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deleteCategorieUseCase = container.resolve(DeleteCategorieUseCase)
    await deleteCategorieUseCase.execute(id)


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

export { DeleteCategorieController }
