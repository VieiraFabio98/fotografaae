import { inject, injectable } from 'tsyringe'
import { City } from '@modules/common/infra/typeorm/entities/city'
import { ICityRepository } from '@modules/common/repositories/i-city-repository'
import { AppError } from '@shared/errors/app-error'

interface IRequest {
  stateId: string
  name: string
}

@injectable()
class CreateCityUseCase {
  constructor(@inject('CityRepository')
    private cityRepository: ICityRepository
  ) {}

  async execute({
    stateId,
    name
  }: IRequest): Promise<City> {
    const result = await this.cityRepository.create({
        stateId,
        name
      })
      .then(cityResult => {
        return cityResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateCityUseCase }
