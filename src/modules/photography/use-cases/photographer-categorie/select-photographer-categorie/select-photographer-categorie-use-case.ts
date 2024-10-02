import { inject, injectable } from 'tsyringe'
import { IPhotographerCategorieRepository } from '@modules/photography/repositories/i-photographer-categorie-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectPhotographerCategorieUseCase {
  constructor(@inject('PhotographerCategorieRepository')
    private photographerCategorieRepository: IPhotographerCategorieRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const photographersCategories = await this.photographerCategorieRepository.select(filter)

    const newPhotographersCategories = {
      items: photographersCategories.data,
      hasNext: false
    }

    return newPhotographersCategories
  }
}

export { SelectPhotographerCategorieUseCase }
