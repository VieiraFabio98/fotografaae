import { inject, injectable } from 'tsyringe'
import { Categorie } from '@modules/photography/infra/typeorm/entities/categorie'
import { ICategorieRepository } from '@modules/photography/repositories/i-categorie-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountCategorieUseCase {
  constructor(@inject('CategorieRepository')
    private categorieRepository: ICategorieRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const categoriesCount = await this.categorieRepository.count(
      search,
      filter
    )

    return categoriesCount
  }
}

export { CountCategorieUseCase }
