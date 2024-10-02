import { inject, injectable } from 'tsyringe'
import { Categorie } from '@modules/photography/infra/typeorm/entities/categorie'
import { ICategorieRepository } from '@modules/photography/repositories/i-categorie-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  name: string
}

@injectable()
class UpdateCategorieUseCase {
  constructor(@inject('CategorieRepository')
    private categorieRepository: ICategorieRepository
  ) {}

  async execute({
    id,
    name
  }: IRequest): Promise<HttpResponse> {
    const categorie = await this.categorieRepository.update({
      id,
      name
    })

    return categorie
  }
}

export { UpdateCategorieUseCase }
