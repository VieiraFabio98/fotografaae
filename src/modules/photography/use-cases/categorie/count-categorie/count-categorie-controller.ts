import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountCategorieUseCase } from './count-categorie-use-case'

class CountCategorieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countCategorieUseCase = container.resolve(CountCategorieUseCase)

    const categoriesCount = await countCategorieUseCase.execute({
      search: search as string
    })

    return response.status(categoriesCount.statusCode).json(categoriesCount)
  }
}

export { CountCategorieController }
