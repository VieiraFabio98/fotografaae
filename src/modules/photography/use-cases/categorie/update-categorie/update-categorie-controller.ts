import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UpdateCategorieUseCase } from './update-categorie-use-case'

class UpdateCategorieController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name
    } = request.body

    const { id } = request.params

    const updateCategorieUseCase = container.resolve(UpdateCategorieUseCase)

    const result = await updateCategorieUseCase.execute({
        id,
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

export { UpdateCategorieController }
