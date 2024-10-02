import { Brackets, getRepository, Repository } from 'typeorm'
import { IPhotographerDTO } from '@modules/photography/dtos/i-photographer-dto'
import { IPhotographerRepository } from '@modules/photography/repositories/i-photographer-repository'
import { Photographer } from '@modules/photography/infra/typeorm/entities/photographer'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class PhotographerRepository implements IPhotographerRepository {
  private repository: Repository<Photographer>

  constructor() {
    this.repository = getRepository(Photographer)
  }


  // create
  async create ({
    name,
    cpf,
    email,
    telephone,
    photos,
    subscriptionId,
    year,
    status
  }: IPhotographerDTO): Promise<HttpResponse> {
    const photographer = this.repository.create({
      name,
      cpf,
      email,
      telephone,
      photos,
      subscriptionId,
      year,
      status
    })

    const result = await this.repository.save(photographer)
      .then(photographerResult => {
        return ok(photographerResult)
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
      let query = this.repository.createQueryBuilder('pho')
        .select([
          'pho.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const photographers = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(pho. AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(photographers)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const photographers = await this.repository.createQueryBuilder('pho')
        .select([
          'pho.id as "value"',
          'pho.nome as "label"',
        ])
        .where('pho.nome ilike :filter', { filter: `${filter}%` })
        .addOrderBy('pho.nome')
        .getRawMany()

      return ok(photographers)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const photographer = await this.repository.createQueryBuilder('pho')
        .select([
          'pho.id as "value"',
          'pho.nome as "label"',
        ])
        .where('pho.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(photographer)
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
      let query = this.repository.createQueryBuilder('pho')
        .select([
          'pho.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const photographers = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(pho. AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: photographers.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const photographer = await this.repository.createQueryBuilder('pho')
        .select([
          'pho.id as "id"',
          'pho.name as "name"',
          'pho.cpf as "cpf"',
          'pho.email as "email"',
          'pho.telephone as "telephone"',
          'pho.photos as "photos"',
          'pho.subscriptionId as "subscriptionId"',
          'a.nome as "subscriptionNome"',
          'pho.year as "year"',
          'pho.status as "status"',
        ])
        .leftJoin('pho.subscriptionId', 'a')
        .where('pho.id = :id', { id })
        .getRawOne()

      if (typeof photographer === 'undefined') {
        return noContent()
      }

      return ok(photographer)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    name,
    cpf,
    email,
    telephone,
    photos,
    subscriptionId,
    year,
    status
  }: IPhotographerDTO): Promise<HttpResponse> {
    const photographer = await this.repository.findOne(id)

    if (!photographer) {
      return notFound()
    }

    const newphotographer = this.repository.create({
      id,
      name,
      cpf,
      email,
      telephone,
      photos,
      subscriptionId,
      year,
      status
    })

    try {
      await this.repository.save(newphotographer)

      return ok(newphotographer)
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

export { PhotographerRepository }
