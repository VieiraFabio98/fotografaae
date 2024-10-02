import { inject, injectable } from 'tsyringe'
import { PhotographerCategorie } from '@modules/photography/infra/typeorm/entities/photographer-categorie'
import { IPhotographerCategorieRepository } from '@modules/photography/repositories/i-photographer-categorie-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  photographerId: string
  categorieId: string
}

@injectable()
class CreatePhotographerCategorieUseCase {
  constructor(@inject('PhotographerCategorieRepository')
    private photographerCategorieRepository: IPhotographerCategorieRepository
  ) {}

  async execute({
    photographerId,
    categorieId
  }: IRequest): Promise<PhotographerCategorie> {
    const result = await this.photographerCategorieRepository.create({
        photographerId,
        categorieId
      })
      .then(photographerCategorieResult => {
        return photographerCategorieResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreatePhotographerCategorieUseCase }
