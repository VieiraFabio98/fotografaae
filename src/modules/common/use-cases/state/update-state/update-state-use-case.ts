import { inject, injectable } from 'tsyringe'
import { State } from '@modules/common/infra/typeorm/entities/state'
import { IStateRepository } from '@modules/common/repositories/i-state-repository'
import { AppError } from '@shared/errors/app-error'
import { HttpResponse } from '@shared/helpers'

interface IRequest {
  id: string
  name: string
  code: string
}

@injectable()
class UpdateStateUseCase {
  constructor(@inject('StateRepository')
    private stateRepository: IStateRepository
  ) {}

  async execute({
    id,
    name,
    code
  }: IRequest): Promise<HttpResponse> {
    const state = await this.stateRepository.update({
      id,
      name,
      code
    })

    return state
  }
}

export { UpdateStateUseCase }
