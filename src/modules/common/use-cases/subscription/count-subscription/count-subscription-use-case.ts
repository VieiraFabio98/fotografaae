import { inject, injectable } from 'tsyringe'
import { Subscription } from '@modules/common/infra/typeorm/entities/subscription'
import { ISubscriptionRepository } from '@modules/common/repositories/i-subscription-repository'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountSubscriptionUseCase {
  constructor(@inject('SubscriptionRepository')
    private subscriptionRepository: ISubscriptionRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const subscriptionsCount = await this.subscriptionRepository.count(
      search,
      filter
    )

    return subscriptionsCount
  }
}

export { CountSubscriptionUseCase }
