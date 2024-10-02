import { Brackets, getRepository, Repository } from 'typeorm'
import { IStateDTO } from '@modules/common/dtos/i-state-dto'
import { IStateRepository } from '@modules/common/repositories/i-state-repository'
import { State } from '@modules/common/infra/typeorm/entities/state'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class StateRepository implements IStateRepository {
  private repository: Repository<State>

  constructor() {
    this.repository = getRepository(State)
  }


  // create
  async create ({
    name,
    code
  }: IStateDTO): Promise<HttpResponse> {
    const state = this.repository.create({
      name,
      code
    })

    const result = await this.repository.save(state)
      .then(stateResult => {
        return ok(stateResult)
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
      "name",
      "code",
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('sta')
        .select([
          'sta.id as "id"',
          'sta.name as "name"',
          'sta.code as "code"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const states = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(sta.name AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(sta.code AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('sta.name', columnOrder[0])
        .addOrderBy('sta.code', columnOrder[1])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(states)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const states = await this.repository.createQueryBuilder('sta')
        .select([
          'sta.id as "value"',
          'sta.name as "label"',
        ])
        .where('sta.name ilike :filter', { filter: `${filter}%` })
        .addOrderBy('sta.name')
        .getRawMany()

      return ok(states)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const state = await this.repository.createQueryBuilder('sta')
        .select([
          'sta.id as "value"',
          'sta.name as "label"',
        ])
        .where('sta.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(state)
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
      let query = this.repository.createQueryBuilder('sta')
        .select([
          'sta.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const states = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(sta.name AS VARCHAR) ilike :search', { search: `%${search}%` })
          query.orWhere('CAST(sta.code AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: states.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const state = await this.repository.createQueryBuilder('sta')
        .select([
          'sta.id as "id"',
          'sta.name as "name"',
          'sta.code as "code"',
        ])
        .where('sta.id = :id', { id })
        .getRawOne()

      if (typeof state === 'undefined') {
        return noContent()
      }

      return ok(state)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    name,
    code
  }: IStateDTO): Promise<HttpResponse> {
    const state = await this.repository.findOne(id)

    if (!state) {
      return notFound()
    }

    const newstate = this.repository.create({
      id,
      name,
      code
    })

    try {
      await this.repository.save(newstate)

      return ok(newstate)
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

export { StateRepository }
