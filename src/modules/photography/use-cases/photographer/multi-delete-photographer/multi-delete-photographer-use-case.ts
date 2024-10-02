import { inject, injectable } from 'tsyringe'
import { IPhotographerRepository } from '@modules/photography/repositories/i-photographer-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeletePhotographerUseCase {
  constructor(@inject('PhotographerRepository')
    private photographerRepository: IPhotographerRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const photographer = await this.photographerRepository.multiDelete(ids)

    return photographer
  }
}

export { MultiDeletePhotographerUseCase }
