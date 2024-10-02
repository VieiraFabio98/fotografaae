import { inject, injectable } from 'tsyringe'
import { Subscription } from '@modules/common/infra/typeorm/entities/subscription'
import { ISubscriptionRepository } from '@modules/common/repositories/i-subscription-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  name: string
  price: number
  descriptionc: string
  duration: number
  status: boolean
}

@injectable()
class CreateSubscriptionUseCase {
  constructor(@inject('SubscriptionRepository')
    private subscriptionRepository: ISubscriptionRepository
  ) {}

  async execute({
    name,
    price,
    descriptionc,
    duration,
    status
  }: IRequest): Promise<Subscription> {
    const result = await this.subscriptionRepository.create({
        name,
        price,
        descriptionc,
        duration,
        status
      })
      .then(subscriptionResult => {
        return subscriptionResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateSubscriptionUseCase }
