import { inject, injectable } from 'tsyringe'
import { Categorie } from '@modules/photography/infra/typeorm/entities/categorie'
import { ICategorieRepository } from '@modules/photography/repositories/i-categorie-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  name: string
}

@injectable()
class CreateCategorieUseCase {
  constructor(@inject('CategorieRepository')
    private categorieRepository: ICategorieRepository
  ) {}

  async execute({
    name
  }: IRequest): Promise<Categorie> {
    const result = await this.categorieRepository.create({
        name
      })
      .then(categorieResult => {
        return categorieResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateCategorieUseCase }
