import { inject, injectable } from "tsyringe"
import { ICategorieRepository } from '@modules/photography/repositories/i-categorie-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectCategorieUseCase {
  constructor(@inject('CategorieRepository')
    private categorieRepository: ICategorieRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const categorie = await this.categorieRepository.idSelect(id)

    return categorie
  }
}

export { IdSelectCategorieUseCase }
