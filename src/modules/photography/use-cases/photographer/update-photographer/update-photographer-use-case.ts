import { inject, injectable } from 'tsyringe'
import { Photographer } from '@modules/photography/infra/typeorm/entities/photographer'
import { IPhotographerRepository } from '@modules/photography/repositories/i-photographer-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  name: string
  cpf: string
  email: string
  telephone: string
  photos: string
  subscriptionId: string
  year: Date
  status: boolean
}

@injectable()
class UpdatePhotographerUseCase {
  constructor(@inject('PhotographerRepository')
    private photographerRepository: IPhotographerRepository
  ) {}

  async execute({
    id,
    name,
    cpf,
    email,
    telephone,
    photos,
    subscriptionId,
    year,
    status
  }: IRequest): Promise<HttpResponse> {
    const photographer = await this.photographerRepository.update({
      id,
      name,
      cpf,
      email,
      telephone,
      photos,
      subscriptionId,
      year,
      status
    })

    return photographer
  }
}

export { UpdatePhotographerUseCase }
