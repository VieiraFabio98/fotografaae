import { inject, injectable } from 'tsyringe'
import { PhotographerCategorie } from '@modules/photography/infra/typeorm/entities/photographer-categorie'
import { IPhotographerCategorieRepository } from '@modules/photography/repositories/i-photographer-categorie-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeletePhotographerCategorieUseCase {
  constructor(@inject('PhotographerCategorieRepository')
    private photographerCategorieRepository: IPhotographerCategorieRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const photographerCategorie = await this.photographerCategorieRepository.delete(id)

    return photographerCategorie
  }
}

export { DeletePhotographerCategorieUseCase }
