import { inject, injectable } from "tsyringe"
import { ISubscriptionRepository } from '@modules/common/repositories/i-subscription-repository'
import { HttpResponse } from '@shared/helpers/http'

@injectable()
class IdSelectSubscriptionUseCase {
  constructor(@inject('SubscriptionRepository')
    private subscriptionRepository: ISubscriptionRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const subscription = await this.subscriptionRepository.idSelect(id)

    return subscription
  }
}

export { IdSelectSubscriptionUseCase }
