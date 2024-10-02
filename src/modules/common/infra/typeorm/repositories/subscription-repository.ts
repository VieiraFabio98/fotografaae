import { Brackets, getRepository, Repository } from 'typeorm'
import { ISubscriptionDTO } from '@modules/common/dtos/i-subscription-dto'
import { ISubscriptionRepository } from '@modules/common/repositories/i-subscription-repository'
import { Subscription } from '@modules/common/infra/typeorm/entities/subscription'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class SubscriptionRepository implements ISubscriptionRepository {
  private repository: Repository<Subscription>

  constructor() {
    this.repository = getRepository(Subscription)
  }


  // create
  async create ({
    name,
    price,
    descriptionc,
    duration,
    status
  }: ISubscriptionDTO): Promise<HttpResponse> {
    const subscription = this.repository.create({
      name,
      price,
      descriptionc,
      duration,
      status
    })

    const result = await this.repository.save(subscription)
      .then(subscriptionResult => {
        return ok(subscriptionResult)
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
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('sub')
        .select([
          'sub.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const subscriptions = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(sub. AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(subscriptions)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const subscriptions = await this.repository.createQueryBuilder('sub')
        .select([
          'sub.id as "value"',
          'sub.nome as "label"',
        ])
        .where('sub.nome ilike :filter', { filter: `${filter}%` })
        .addOrderBy('sub.nome')
        .getRawMany()

      return ok(subscriptions)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const subscription = await this.repository.createQueryBuilder('sub')
        .select([
          'sub.id as "value"',
          'sub.nome as "label"',
        ])
        .where('sub.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(subscription)
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
      let query = this.repository.createQueryBuilder('sub')
        .select([
          'sub.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const subscriptions = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(sub. AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: subscriptions.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const subscription = await this.repository.createQueryBuilder('sub')
        .select([
          'sub.id as "id"',
          'sub.name as "name"',
          'sub.price as "price"',
          'sub.descriptionc as "descriptionc"',
          'sub.duration as "duration"',
          'sub.status as "status"',
        ])
        .where('sub.id = :id', { id })
        .getRawOne()

      if (typeof subscription === 'undefined') {
        return noContent()
      }

      return ok(subscription)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    name,
    price,
    descriptionc,
    duration,
    status
  }: ISubscriptionDTO): Promise<HttpResponse> {
    const subscription = await this.repository.findOne(id)

    if (!subscription) {
      return notFound()
    }

    const newsubscription = this.repository.create({
      id,
      name,
      price,
      descriptionc,
      duration,
      status
    })

    try {
      await this.repository.save(newsubscription)

      return ok(newsubscription)
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

export { SubscriptionRepository }
