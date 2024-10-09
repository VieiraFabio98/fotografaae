import { inject, injectable } from 'tsyringe'
import { Photographer } from '@modules/photography/infra/typeorm/entities/photographer'
import { IPhotographerRepository } from '@modules/photography/repositories/i-photographer-repository'
import { AppError } from '@shared/errors/app-error'
import { IPhotographerCategorieRepository } from '@modules/photography/repositories/i-photographer-categorie-repository'

interface IRequest {
  name: string
  lastName: string
  cpf: string
  email: string
  telephone: string
  photos: string
  description: string
  subscriptionId: string
  status: boolean
  categories: string[]
}

@injectable()
class CreatePhotographerUseCase {
  constructor(
    @inject('PhotographerRepository')
    private photographerRepository: IPhotographerRepository,
    @inject('PhotographerCategorieRepository')
    private photographerCategorieRepository: IPhotographerCategorieRepository,
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
    status,
    categories
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

    categories.forEach(async category => {
      await this.photographerCategorieRepository.create({
        photographerId: result.data.id,
        categorieId: category
      })
    })

    return result
  }
}

export { CreatePhotographerUseCase }
