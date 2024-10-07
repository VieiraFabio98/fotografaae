import { inject, injectable } from 'tsyringe'
import { Photographer } from '@modules/photography/infra/typeorm/entities/photographer'
import { IPhotographerRepository } from '@modules/photography/repositories/i-photographer-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  name: string
  lastName: string
  cpf: string
  email: string
  telephone: string
  photos: string
  description: string
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
    lastName,
    cpf,
    email,
    telephone,
    photos,
    description,
    subscriptionId,
    status
  }: IRequest): Promise<Photographer> {
    const result = await this.photographerRepository.create({
        name,
        lastName,
        cpf,
        email,
        telephone,
        photos,
        description,
        subscriptionId,
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
