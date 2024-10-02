import { Brackets, getRepository, Repository } from 'typeorm'
import { ICityDTO } from '@modules/common/dtos/i-city-dto'
import { ICityRepository } from '@modules/common/repositories/i-city-repository'
import { City } from '@modules/common/infra/typeorm/entities/city'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class CityRepository implements ICityRepository {
  private repository: Repository<City>

  constructor() {
    this.repository = getRepository(City)
  }


  // create
  async create ({
    stateId,
    name
  }: ICityDTO): Promise<HttpResponse> {
    const city = this.repository.create({
      stateId,
      name
    })

    const result = await this.repository.save(city)
      .then(cityResult => {
        return ok(cityResult)
      })
      .catch(error => {
        return serverError(error)
      })

    return result
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string,
    filter: string
  ): Promise<HttpResponse> {
    let columnName: string
    let columnDirection: 'ASC' | 'DESC'

    if ((typeof(order) === 'undefined') || (order === "")) {
      columnName = 'nome'
      columnDirection = 'ASC'
    } else {
      columnName = order.substring(0, 1) === '-' ? order.substring(1) : order
      columnDirection = order.substring(0, 1) === '-' ? 'DESC' : 'ASC'
    }

    const referenceArray = [
      "stateName",
      "name",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('cit')
        .select([
          'cit.id as "id"',
          'a.id as "stateId"',
          'a.name as "stateName"',
          'cit.name as "name"',
        ])
        .leftJoin('cit.stateId', 'a')

      if (filter) {
        query = query
          .where(filter)
      }

      const cities = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.name AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(cit.name AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('a.name', columnOrder[0])
        .addOrderBy('cit.name', columnOrder[1])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(cities)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const cities = await this.repository.createQueryBuilder('cit')
        .select([
          'cit. as "value"',
          'cit. as "label"',
        ])
        .where('cit. ilike :filter', { filter: `${filter}%` })
        .addOrderBy('cit.')
        .getRawMany()

      return ok(cities)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const city = await this.repository.createQueryBuilder('cit')
        .select([
          'cit. as "value"',
          'cit. as "label"',
        ])
        .where('cit. = :id', { id: `${id}` })
        .getRawOne()

      return ok(city)
    } catch (err) {
      return serverError(err)
    }
  }


  // count
  async count (
    search: string,
    filter: string
  ): Promise<HttpResponse> {
    try {
      let query = this.repository.createQueryBuilder('cit')
        .select([
          'cit.id as "id"',
        ])
        .leftJoin('cit.stateId', 'a')

      if (filter) {
        query = query
          .where(filter)
      }

      const cities = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(a.name AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(cit.name AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: cities.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const city = await this.repository.createQueryBuilder('cit')
        .select([
          'cit.id as "id"',
          'cit.stateId as "stateId"',
          'a.name as "stateName"',
          'cit.name as "name"',
        ])
        .leftJoin('cit.stateId', 'a')
        .where('cit.id = :id', { id })
        .getRawOne()

      if (typeof city === 'undefined') {
        return noContent()
      }

      return ok(city)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    stateId,
    name
  }: ICityDTO): Promise<HttpResponse> {
    const city = await this.repository.findOne(id)

    if (!city) {
      return notFound()
    }

    const newcity = this.repository.create({
      id,
      stateId,
      name
    })

    try {
      await this.repository.save(newcity)

      return ok(newcity)
    } catch (err) {
      return serverError(err)
    }
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    try {
      await this.repository.delete(id)

      return noContent()
    } catch (err) {
      if(err.message.slice(0, 10) === 'null value') {
        throw new AppError('not null constraint', 404)
      }

      return serverError(err)
    }
  }


  // multi delete
  async multiDelete (ids: string[]): Promise<HttpResponse> {
    try {
      await this.repository.delete(ids)

      return noContent()
    } catch (err) {
      if(err.message.slice(0, 10) === 'null value') {
        throw new AppError('not null constraint', 404)
      }

      return serverError(err)
    }
  }
}

export { CityRepository }
