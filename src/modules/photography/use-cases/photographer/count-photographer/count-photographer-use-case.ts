import { inject, injectable } from 'tsyringe'
import { Photographer } from '@modules/photography/infra/typeorm/entities/photographer'
import { IPhotographerRepository } from '@modules/photography/repositories/i-photographer-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountPhotographerUseCase {
  constructor(@inject('PhotographerRepository')
    private photographerRepository: IPhotographerRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const photographersCount = await this.photographerRepository.count(
      search,
      filter
    )

    return photographersCount
  }
}

export { CountPhotographerUseCase }
