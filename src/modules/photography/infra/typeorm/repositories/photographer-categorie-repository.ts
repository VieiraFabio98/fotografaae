import { Brackets, getRepository, Repository } from 'typeorm'
import { IPhotographerCategorieDTO } from '@modules/photography/dtos/i-photographer-categorie-dto'
import { IPhotographerCategorieRepository } from '@modules/photography/repositories/i-photographer-categorie-repository'
import { PhotographerCategorie } from '@modules/photography/infra/typeorm/entities/photographer-categorie'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class PhotographerCategorieRepository implements IPhotographerCategorieRepository {
  private repository: Repository<PhotographerCategorie>

  constructor() {
    this.repository = getRepository(PhotographerCategorie)
  }


  // create
  async create ({
    photographerId,
    categorieId
  }: IPhotographerCategorieDTO): Promise<HttpResponse> {
    const photographerCategorie = this.repository.create({
      photographerId,
      categorieId
    })

    const result = await this.repository.save(photographerCategorie)
      .then(photographerCategorieResult => {
        return ok(photographerCategorieResult)
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

      const photographersCategories = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(pho. AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(photographersCategories)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const photographersCategories = await this.repository.createQueryBuilder('pho')
        .select([
          'pho. as "value"',
          'pho. as "label"',
        ])
        .where('pho. ilike :filter', { filter: `${filter}%` })
        .addOrderBy('pho.')
        .getRawMany()

      return ok(photographersCategories)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const photographerCategorie = await this.repository.createQueryBuilder('pho')
        .select([
          'pho. as "value"',
          'pho. as "label"',
        ])
        .where('pho. = :id', { id: `${id}` })
        .getRawOne()

      return ok(photographerCategorie)
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

      const photographersCategories = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(pho. AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: photographersCategories.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const photographerCategorie = await this.repository.createQueryBuilder('pho')
        .select([
          'pho.id as "id"',
          'pho.photographerId as "photographerId"',
          'a.nome as "photographerNome"',
          'pho.categorieId as "categorieId"',
          'b.nome as "categorieNome"',
        ])
        .leftJoin('pho.photographerId', 'a')
        .leftJoin('pho.categorieId', 'b')
        .where('pho.id = :id', { id })
        .getRawOne()

      if (typeof photographerCategorie === 'undefined') {
        return noContent()
      }

      return ok(photographerCategorie)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    photographerId,
    categorieId
  }: IPhotographerCategorieDTO): Promise<HttpResponse> {
    const photographerCategorie = await this.repository.findOne(id)

    if (!photographerCategorie) {
      return notFound()
    }

    const newphotographerCategorie = this.repository.create({
      id,
      photographerId,
      categorieId
    })

    try {
      await this.repository.save(newphotographerCategorie)

      return ok(newphotographerCategorie)
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

export { PhotographerCategorieRepository }
