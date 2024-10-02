import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeletePhotographerCategorieUseCase } from './delete-photographer-categorie-use-case'
import { ListPhotographerCategorieUseCase } from '../list-photographer-categorie/list-photographer-categorie-use-case'

class DeletePhotographerCategorieController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deletePhotographerCategorieUseCase = container.resolve(DeletePhotographerCategorieUseCase)
    await deletePhotographerCategorieUseCase.execute(id)


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

export { DeletePhotographerCategorieController }
