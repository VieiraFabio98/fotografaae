import { inject, injectable } from 'tsyringe'
import { Photographer } from '@modules/photography/infra/typeorm/entities/photographer'
import { IPhotographerRepository } from '@modules/photography/repositories/i-photographer-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
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
class CreatePhotographerUseCase {
  constructor(@inject('PhotographerRepository')
    private photographerRepository: IPhotographerRepository
  ) {}

  async execute({
    name,
    cpf,
    email,
    telephone,
    photos,
    subscriptionId,
    year,
    status
  }: IRequest): Promise<Photographer> {
    const result = await this.photographerRepository.create({
        name,
        cpf,
        email,
        telephone,
        photos,
        subscriptionId,
        year,
        status
      })
      .then(photographerResult => {
        return photographerResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreatePhotographerUseCase }
