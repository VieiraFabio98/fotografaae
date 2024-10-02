import { Brackets, getRepository, Repository } from 'typeorm'
import { ICategorieDTO } from '@modules/photography/dtos/i-categorie-dto'
import { ICategorieRepository } from '@modules/photography/repositories/i-categorie-repository'
import { Categorie } from '@modules/photography/infra/typeorm/entities/categorie'
import { noContent, serverError, ok, notFound, HttpResponse } from '@shared/helpers'
import { AppError } from '@shared/errors/app-error'

class CategorieRepository implements ICategorieRepository {
  private repository: Repository<Categorie>

  constructor() {
    this.repository = getRepository(Categorie)
  }


  // create
  async create ({
    name
  }: ICategorieDTO): Promise<HttpResponse> {
    const categorie = this.repository.create({
      name
    })

    const result = await this.repository.save(categorie)
      .then(categorieResult => {
        return ok(categorieResult)
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
    ]
    const columnOrder = new Array<'ASC' | 'DESC'>(2).fill('ASC')

    const index = referenceArray.indexOf(columnName)

    columnOrder[index] = columnDirection

    const offset = rowsPerPage * page

    try {
      let query = this.repository.createQueryBuilder('cat')
        .select([
          'cat.id as "id"',
          'cat.name as "name"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const categories = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(cat.name AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .addOrderBy('cat.name', columnOrder[0])
        .offset(offset)
        .limit(rowsPerPage)
        .take(rowsPerPage)
        .getRawMany()

      return ok(categories)
    } catch (err) {
      return serverError(err)
    }
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    try {
      const categories = await this.repository.createQueryBuilder('cat')
        .select([
          'cat.id as "value"',
          'cat.nome as "label"',
        ])
        .where('cat.nome ilike :filter', { filter: `${filter}%` })
        .addOrderBy('cat.nome')
        .getRawMany()

      return ok(categories)
    } catch (err) {
      return serverError(err)
    }
  }


  // id select
  async idSelect (id: string): Promise<HttpResponse> {
    try {
      const categorie = await this.repository.createQueryBuilder('cat')
        .select([
          'cat.id as "value"',
          'cat.nome as "label"',
        ])
        .where('cat.id = :id', { id: `${id}` })
        .getRawOne()

      return ok(categorie)
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
      let query = this.repository.createQueryBuilder('cat')
        .select([
          'cat.id as "id"',
        ])

      if (filter) {
        query = query
          .where(filter)
      }

      const categories = await query
        .andWhere(new Brackets(query => {
          query.andWhere('CAST(cat.name AS VARCHAR) ilike :search', { search: `%${search}%` })
        }))
        .getRawMany()

      return ok({ count: categories.length })
    } catch (err) {
      return serverError(err)
    }
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    try {
      const categorie = await this.repository.createQueryBuilder('cat')
        .select([
          'cat.id as "id"',
          'cat.name as "name"',
        ])
        .where('cat.id = :id', { id })
        .getRawOne()

      if (typeof categorie === 'undefined') {
        return noContent()
      }

      return ok(categorie)
    } catch (err) {
      return serverError(err)
    }
  }


  // update
  async update ({
    id,
    name
  }: ICategorieDTO): Promise<HttpResponse> {
    const categorie = await this.repository.findOne(id)

    if (!categorie) {
      return notFound()
    }

    const newcategorie = this.repository.create({
      id,
      name
    })

    try {
      await this.repository.save(newcategorie)

      return ok(newcategorie)
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

export { CategorieRepository }
