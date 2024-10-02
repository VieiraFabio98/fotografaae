import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountPhotographerCategorieUseCase } from './count-photographer-categorie-use-case'

class CountPhotographerCategorieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countPhotographerCategorieUseCase = container.resolve(CountPhotographerCategorieUseCase)

    const photographersCategoriesCount = await countPhotographerCategorieUseCase.execute({
      search: search as string
    })

    return response.status(photographersCategoriesCount.statusCode).json(photographersCategoriesCount)
  }
}

export { CountPhotographerCategorieController }
