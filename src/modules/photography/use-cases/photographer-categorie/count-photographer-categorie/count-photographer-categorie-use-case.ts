import { inject, injectable } from 'tsyringe'
import { PhotographerCategorie } from '@modules/photography/infra/typeorm/entities/photographer-categorie'
import { IPhotographerCategorieRepository } from '@modules/photography/repositories/i-photographer-categorie-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountPhotographerCategorieUseCase {
  constructor(@inject('PhotographerCategorieRepository')
    private photographerCategorieRepository: IPhotographerCategorieRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const photographersCategoriesCount = await this.photographerCategorieRepository.count(
      search,
      filter
    )

    return photographersCategoriesCount
  }
}

export { CountPhotographerCategorieUseCase }
