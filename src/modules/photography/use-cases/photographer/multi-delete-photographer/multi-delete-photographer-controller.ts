import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { MultiDeletePhotographerUseCase } from './multi-delete-photographer-use-case'
import { ListPhotographerUseCase } from '../list-photographer/list-photographer-use-case'

class MultiDeletePhotographerController {
  async handle(request: Request, response: Response): Promise<Response> {
    // delete multi record

    const ids = request.body
    const multiDeletePhotographerUseCase = container.resolve(MultiDeletePhotographerUseCase)
    await multiDeletePhotographerUseCase.execute(ids)


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

export { MultiDeletePhotographerController }
