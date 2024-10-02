import { inject, injectable } from "tsyringe"
import { IPhotographerRepository } from '@modules/photography/repositories/i-photographer-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectPhotographerUseCase {
  constructor(@inject('PhotographerRepository')
    private photographerRepository: IPhotographerRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const photographer = await this.photographerRepository.idSelect(id)

    return photographer
  }
}

export { IdSelectPhotographerUseCase }
