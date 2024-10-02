import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetPhotographerCategorieUseCase } from './get-photographer-categorie-use-case'

class GetPhotographerCategorieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getPhotographerCategorieUseCase = container.resolve(GetPhotographerCategorieUseCase)
    const photographerCategorie = await getPhotographerCategorieUseCase.execute(id)

    return response.status(photographerCategorie.statusCode).json(photographerCategorie.data)
  }
}

export { GetPhotographerCategorieController }
