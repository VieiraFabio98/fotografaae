import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCategorieUseCase } from './list-categorie-use-case'

class ListCategorieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search,
      page,
      pageSize,
      order,
      filter
    } = request.body

    const listCategorieUseCase = container.resolve(ListCategorieUseCase)

    const categories = await listCategorieUseCase.execute({
      search: search as string,
      page: Number(page) as number,
      rowsPerPage: Number(pageSize) as number,
      order: order as string,
      filter: filter as string
    })

    return response.json(categories)
  }
}

export { ListCategorieController }
