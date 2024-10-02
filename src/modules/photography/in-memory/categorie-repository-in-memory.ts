import { ICategorieDTO } from '@modules/photography/dtos/i-categorie-dto'
import { ICategorieRepository } from '@modules/photography/repositories/i-categorie-repository'
import { Categorie } from '@modules/photography/infra/typeorm/entities/categorie'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class CategorieRepositoryInMemory implements ICategorieRepository {
  categories: Categorie[] = []

  // create
  async create ({
    name
  }: ICategorieDTO): Promise<HttpResponse> {
    const categorie = new Categorie()

    Object.assign(categorie, {
      name
    })

    this.categories.push(categorie)

    return ok(categorie)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredCategories = this.categories

    filteredCategories = filteredCategories.filter((categorie) => {
      if (categorie.name.includes(search)) return true

      return false
    })

    return ok(filteredCategories.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredCategories = this.categories

    filteredCategories = filteredCategories.filter((categorie) => {
      if (categorie.name.includes(filter)) return true

      return false
    })

    return ok(filteredCategories)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredCategories = this.categories

    filteredCategories = filteredCategories.filter((categorie) => {
      if (categorie.name.includes(search)) return true

      return false
    })

    return ok(filteredCategories.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const categorie = this.categories.find((categorie) => categorie.id === id)

    if (typeof categorie === 'undefined') {
      return notFound()
    } else {
      return ok(categorie)
    }
  }


  // update
  async update ({
    id,
    name
  }: ICategorieDTO): Promise<HttpResponse> {
    const index = this.categories.findIndex((categorie) => categorie.id === id)

    this.categories[index].name = name

    return ok(this.categories[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.categories.findIndex((categorie) => categorie.id === id)

    this.categories.splice(index, 1)

    return ok(this.categories)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { CategorieRepositoryInMemory }
