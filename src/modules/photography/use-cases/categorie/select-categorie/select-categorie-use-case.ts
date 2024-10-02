import { inject, injectable } from 'tsyringe'
import { ICategorieRepository } from '@modules/photography/repositories/i-categorie-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectCategorieUseCase {
  constructor(@inject('CategorieRepository')
    private categorieRepository: ICategorieRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const categories = await this.categorieRepository.select(filter)

    const newCategories = {
      items: categories.data,
      hasNext: false
    }

    return newCategories
  }
}

export { SelectCategorieUseCase }
