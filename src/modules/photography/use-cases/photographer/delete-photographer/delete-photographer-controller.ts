import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeletePhotographerUseCase } from './delete-photographer-use-case'
import { ListPhotographerUseCase } from '../list-photographer/list-photographer-use-case'

class DeletePhotographerController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete record
    
    const id = request.params.id
    const deletePhotographerUseCase = container.resolve(DeletePhotographerUseCase)
    await deletePhotographerUseCase.execute(id)


    // restore list with updated records

    const listPhotographerUseCase = container.resolve(ListPhotographerUseCase)
    const photographers = await listPhotographerUseCase.execute({
      search: '',
      page: 0,
      rowsPerPage: 100,
      order: ''
    })

    return response.json(photographers)
  }
}

export { DeletePhotographerController }
