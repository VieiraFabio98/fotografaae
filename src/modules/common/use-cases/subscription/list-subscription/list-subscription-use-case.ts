import { inject, injectable } from 'tsyringe'
import { ISubscriptionRepository } from '@modules/common/repositories/i-subscription-repository'
import { ISubscriptionDTO } from '@modules/common/dtos/i-subscription-dto';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: ISubscriptionDTO[],
  hasNext: boolean
}

@injectable()
class ListSubscriptionUseCase {
  constructor(@inject('SubscriptionRepository')
    private subscriptionRepository: ISubscriptionRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const subscriptions = await this.subscriptionRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countSubscriptions = await this.subscriptionRepository.count(
      search,
      filter
    )

    const numeroSubscription = page * rowsPerPage

    const subscriptionsResponse = {
      items: subscriptions.data,
      hasNext: numeroSubscription < countSubscriptions.data.count
    }

    return subscriptionsResponse
  }
}

export { ListSubscriptionUseCase }
