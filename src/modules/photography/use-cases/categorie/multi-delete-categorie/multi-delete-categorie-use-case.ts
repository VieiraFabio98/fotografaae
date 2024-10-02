import { inject, injectable } from 'tsyringe'
import { ICategorieRepository } from '@modules/photography/repositories/i-categorie-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteCategorieUseCase {
  constructor(@inject('CategorieRepository')
    private categorieRepository: ICategorieRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const categorie = await this.categorieRepository.multiDelete(ids)

    return categorie
  }
}

export { MultiDeleteCategorieUseCase }
