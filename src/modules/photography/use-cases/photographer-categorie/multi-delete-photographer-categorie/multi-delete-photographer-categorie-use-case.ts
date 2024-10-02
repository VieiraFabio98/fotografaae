import { inject, injectable } from 'tsyringe'
import { IPhotographerCategorieRepository } from '@modules/photography/repositories/i-photographer-categorie-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeletePhotographerCategorieUseCase {
  constructor(@inject('PhotographerCategorieRepository')
    private photographerCategorieRepository: IPhotographerCategorieRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const photographerCategorie = await this.photographerCategorieRepository.multiDelete(ids)

    return photographerCategorie
  }
}

export { MultiDeletePhotographerCategorieUseCase }
