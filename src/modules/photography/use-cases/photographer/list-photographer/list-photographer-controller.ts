import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListPhotographerUseCase } from './list-photographer-use-case'

class ListPhotographerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listPhotographerUseCase = container.resolve(ListPhotographerUseCase)

    const photographers = await listPhotographerUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(photographers)
  }
}

export { ListPhotographerController }
