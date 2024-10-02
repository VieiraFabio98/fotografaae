import { inject, injectable } from 'tsyringe'
import { Subscription } from '@modules/common/infra/typeorm/entities/subscription'
import { ISubscriptionRepository } from '@modules/common/repositories/i-subscription-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  name: string
  price: number
  descriptionc: string
  duration: number
  status: boolean
}

@injectable()
class UpdateSubscriptionUseCase {
  constructor(@inject('SubscriptionRepository')
    private subscriptionRepository: ISubscriptionRepository
  ) {}

  async execute({
    id,
    name,
    price,
    descriptionc,
    duration,
    status
  }: IRequest): Promise<HttpResponse> {
    const subscription = await this.subscriptionRepository.update({
      id,
      name,
      price,
      descriptionc,
      duration,
      status
    })

    return subscription
  }
}

export { UpdateSubscriptionUseCase }
