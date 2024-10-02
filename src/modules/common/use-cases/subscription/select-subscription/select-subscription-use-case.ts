import { inject, injectable } from 'tsyringe'
import { ISubscriptionRepository } from '@modules/common/repositories/i-subscription-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectSubscriptionUseCase {
  constructor(@inject('SubscriptionRepository')
    private subscriptionRepository: ISubscriptionRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const subscriptions = await this.subscriptionRepository.select(filter)

    const newSubscriptions = {
      items: subscriptions.data,
      hasNext: false
    }

    return newSubscriptions
  }
}

export { SelectSubscriptionUseCase }
