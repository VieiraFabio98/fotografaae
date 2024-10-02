import { inject, injectable } from "tsyringe"
import { IPhotographerCategorieRepository } from '@modules/photography/repositories/i-photographer-categorie-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectPhotographerCategorieUseCase {
  constructor(@inject('PhotographerCategorieRepository')
    private photographerCategorieRepository: IPhotographerCategorieRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const photographerCategorie = await this.photographerCategorieRepository.idSelect(id)

    return photographerCategorie
  }
}

export { IdSelectPhotographerCategorieUseCase }
