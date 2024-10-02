import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectPhotographerCategorieUseCase } from './id-select-photographer-categorie-use-case'

class IdSelectPhotographerCategorieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectPhotographerCategorieUseCase = container.resolve(IdSelectPhotographerCategorieUseCase)

    const photographerCategorie = await idSelectPhotographerCategorieUseCase.execute({
      id: id as string
    })

    return response.json(photographerCategorie.data)
  }
}

export { IdSelectPhotographerCategorieController }
