import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreatePhotographerCategorieUseCase } from './create-photographer-categorie-use-case'
import { HttpResponse } from '@shared/helpers'

class CreatePhotographerCategorieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      photographerId,
      categorieId
    } = request.body

    const createPhotographerCategorieUseCase = container.resolve(CreatePhotographerCategorieUseCase)

    const result = await createPhotographerCategorieUseCase.execute({
        photographerId,
        categorieId
      })
      .then(photographerCategorieResult => {
        return photographerCategorieResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreatePhotographerCategorieController }
