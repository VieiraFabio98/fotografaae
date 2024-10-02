import { inject, injectable } from 'tsyringe'
import { ICategorieRepository } from '@modules/photography/repositories/i-categorie-repository'
import { ICategorieDTO } from '@modules/photography/dtos/i-categorie-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: ICategorieDTO[],
  hasNext: boolean
}

@injectable()
class ListCategorieUseCase {
  constructor(@inject('CategorieRepository')
    private categorieRepository: ICategorieRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const categories = await this.categorieRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countCategories = await this.categorieRepository.count(
      search,
      filter
    )

    const numeroCategorie = page * rowsPerPage

    const categoriesResponse = {
      items: categories.data,
      hasNext: numeroCategorie < countCategories.data.count
    }

    return categoriesResponse
  }
}

export { ListCategorieUseCase }
