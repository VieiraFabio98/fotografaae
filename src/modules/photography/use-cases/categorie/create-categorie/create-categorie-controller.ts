import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateCategorieUseCase } from './create-categorie-use-case'
import { HttpResponse } from '@shared/helpers'

class CreateCategorieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name
    } = request.body

    const createCategorieUseCase = container.resolve(CreateCategorieUseCase)

    const result = await createCategorieUseCase.execute({
        name
      })
      .then(categorieResult => {
        return categorieResult
      })
      .catch(error => {
        return error
      })

    return response.status(result.statusCode).json(result)
  }
}

export { CreateCategorieController }
