import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdatePhotographerCategorieUseCase } from './update-photographer-categorie-use-case'

class UpdatePhotographerCategorieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      photographerId,
      categorieId
    } = request.body

    const { id } = request.params

    const updatePhotographerCategorieUseCase = container.resolve(UpdatePhotographerCategorieUseCase)

    const result = await updatePhotographerCategorieUseCase.execute({
        id,
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

export { UpdatePhotographerCategorieController }
