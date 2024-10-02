import { inject, injectable } from 'tsyringe'
import { IPhotographerCategorieRepository } from '@modules/photography/repositories/i-photographer-categorie-repository'
import { IPhotographerCategorieDTO } from '@modules/photography/dtos/i-photographer-categorie-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IPhotographerCategorieDTO[],
  hasNext: boolean
}

@injectable()
class ListPhotographerCategorieUseCase {
  constructor(@inject('PhotographerCategorieRepository')
    private photographerCategorieRepository: IPhotographerCategorieRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const photographersCategories = await this.photographerCategorieRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countPhotographersCategories = await this.photographerCategorieRepository.count(
      search,
      filter
    )

    const numeroPhotographerCategorie = page * rowsPerPage

    const photographersCategoriesResponse = {
      items: photographersCategories.data,
      hasNext: numeroPhotographerCategorie < countPhotographersCategories.data.count
    }

    return photographersCategoriesResponse
  }
}

export { ListPhotographerCategorieUseCase }
