import { inject, injectable } from 'tsyringe'
import { Subscription } from '@modules/common/infra/typeorm/entities/subscription'
import { ISubscriptionRepository } from '@modules/common/repositories/i-subscription-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class DeleteSubscriptionUseCase {
  constructor(@inject('SubscriptionRepository')
    private subscriptionRepository: ISubscriptionRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const subscription = await this.subscriptionRepository.delete(id)

    return subscription
  }
}

export { DeleteSubscriptionUseCase }
