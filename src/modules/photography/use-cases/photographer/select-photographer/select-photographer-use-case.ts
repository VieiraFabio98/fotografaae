import { inject, injectable } from 'tsyringe'
import { IPhotographerRepository } from '@modules/photography/repositories/i-photographer-repository'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectPhotographerUseCase {
  constructor(@inject('PhotographerRepository')
    private photographerRepository: IPhotographerRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const photographers = await this.photographerRepository.select(filter)

    const newPhotographers = {
      items: photographers.data,
      hasNext: false
    }

    return newPhotographers
  }
}

export { SelectPhotographerUseCase }
