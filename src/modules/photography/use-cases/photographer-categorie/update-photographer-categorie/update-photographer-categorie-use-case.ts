import { inject, injectable } from 'tsyringe'
import { PhotographerCategorie } from '@modules/photography/infra/typeorm/entities/photographer-categorie'
import { IPhotographerCategorieRepository } from '@modules/photography/repositories/i-photographer-categorie-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  photographerId: string
  categorieId: string
}

@injectable()
class UpdatePhotographerCategorieUseCase {
  constructor(@inject('PhotographerCategorieRepository')
    private photographerCategorieRepository: IPhotographerCategorieRepository
  ) {}

  async execute({
    id,
    photographerId,
    categorieId
  }: IRequest): Promise<HttpResponse> {
    const photographerCategorie = await this.photographerCategorieRepository.update({
      id,
      photographerId,
      categorieId
    })

    return photographerCategorie
  }
}

export { UpdatePhotographerCategorieUseCase }
