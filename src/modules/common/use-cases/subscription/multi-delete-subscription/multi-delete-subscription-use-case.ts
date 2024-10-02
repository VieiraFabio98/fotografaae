import { inject, injectable } from 'tsyringe'
import { ISubscriptionRepository } from '@modules/common/repositories/i-subscription-repository';
import { HttpResponse } from '@shared/helpers';

@injectable()
class MultiDeleteSubscriptionUseCase {
  constructor(@inject('SubscriptionRepository')
    private subscriptionRepository: ISubscriptionRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const subscription = await this.subscriptionRepository.multiDelete(ids)

    return subscription
  }
}

export { MultiDeleteSubscriptionUseCase }
