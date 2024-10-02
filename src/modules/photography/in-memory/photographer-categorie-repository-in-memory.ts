import { IPhotographerCategorieDTO } from '@modules/photography/dtos/i-photographer-categorie-dto'
import { IPhotographerCategorieRepository } from '@modules/photography/repositories/i-photographer-categorie-repository'
import { PhotographerCategorie } from '@modules/photography/infra/typeorm/entities/photographer-categorie'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class PhotographerCategorieRepositoryInMemory implements IPhotographerCategorieRepository {
  photographersCategories: PhotographerCategorie[] = []

  // create
  async create ({
    photographerId,
    categorieId
  }: IPhotographerCategorieDTO): Promise<HttpResponse> {
    const photographerCategorie = new PhotographerCategorie()

    Object.assign(photographerCategorie, {
      photographerId,
      categorieId
    })

    this.photographersCategories.push(photographerCategorie)

    return ok(photographerCategorie)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredPhotographersCategories = this.photographersCategories

    filteredPhotographersCategories = filteredPhotographersCategories.filter((photographerCategorie) => {

      return false
    })

    return ok(filteredPhotographersCategories.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredPhotographersCategories = this.photographersCategories

    filteredPhotographersCategories = filteredPhotographersCategories.filter((photographerCategorie) => {

      return false
    })

    return ok(filteredPhotographersCategories)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredPhotographersCategories = this.photographersCategories

    filteredPhotographersCategories = filteredPhotographersCategories.filter((photographerCategorie) => {

      return false
    })

    return ok(filteredPhotographersCategories.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const photographerCategorie = this.photographersCategories.find((photographerCategorie) => photographerCategorie.id === id)

    if (typeof photographerCategorie === 'undefined') {
      return notFound()
    } else {
      return ok(photographerCategorie)
    }
  }


  // update
  async update ({
    id,
    photographerId,
    categorieId
  }: IPhotographerCategorieDTO): Promise<HttpResponse> {
    const index = this.photographersCategories.findIndex((photographerCategorie) => photographerCategorie.id === id)

    this.photographersCategories[index].photographerId = photographerId
    this.photographersCategories[index].categorieId = categorieId

    return ok(this.photographersCategories[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.photographersCategories.findIndex((photographerCategorie) => photographerCategorie.id === id)

    this.photographersCategories.splice(index, 1)

    return ok(this.photographersCategories)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { PhotographerCategorieRepositoryInMemory }
