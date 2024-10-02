import { inject, injectable } from 'tsyringe'
import { IPhotographerRepository } from '@modules/photography/repositories/i-photographer-repository'
import { IPhotographerDTO } from '@modules/photography/dtos/i-photographer-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IPhotographerDTO[],
  hasNext: boolean
}

@injectable()
class ListPhotographerUseCase {
  constructor(@inject('PhotographerRepository')
    private photographerRepository: IPhotographerRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const photographers = await this.photographerRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countPhotographers = await this.photographerRepository.count(
      search,
      filter
    )

    const numeroPhotographer = page * rowsPerPage

    const photographersResponse = {
      items: photographers.data,
      hasNext: numeroPhotographer < countPhotographers.data.count
    }

    return photographersResponse
  }
}

export { ListPhotographerUseCase }
