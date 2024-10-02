import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { IdSelectCategorieUseCase } from './id-select-categorie-use-case'

class IdSelectCategorieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const idSelectCategorieUseCase = container.resolve(IdSelectCategorieUseCase)

    const categorie = await idSelectCategorieUseCase.execute({
      id: id as string
    })

    return response.json(categorie.data)
  }
}

export { IdSelectCategorieController }
