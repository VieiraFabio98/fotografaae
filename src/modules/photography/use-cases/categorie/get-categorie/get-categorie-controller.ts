import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetCategorieUseCase } from './get-categorie-use-case'

class GetCategorieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const id = request.params.id
    const getCategorieUseCase = container.resolve(GetCategorieUseCase)
    const categorie = await getCategorieUseCase.execute(id)

    return response.status(categorie.statusCode).json(categorie.data)
  }
}

export { GetCategorieController }
