import { IPhotographerDTO } from '@modules/photography/dtos/i-photographer-dto'
import { IPhotographerRepository } from '@modules/photography/repositories/i-photographer-repository'
import { Photographer } from '@modules/photography/infra/typeorm/entities/photographer'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class PhotographerRepositoryInMemory implements IPhotographerRepository {
  photographers: Photographer[] = []

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
    const photographer = new Photographer()

    Object.assign(photographer, {
      name,
      cpf,
      email,
      telephone,
      photos,
      subscriptionId,
      year,
      status
    })

    this.photographers.push(photographer)

    return ok(photographer)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredPhotographers = this.photographers

    filteredPhotographers = filteredPhotographers.filter((photographer) => {

      return false
    })

    return ok(filteredPhotographers.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredPhotographers = this.photographers

    filteredPhotographers = filteredPhotographers.filter((photographer) => {

      return false
    })

    return ok(filteredPhotographers)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredPhotographers = this.photographers

    filteredPhotographers = filteredPhotographers.filter((photographer) => {

      return false
    })

    return ok(filteredPhotographers.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const photographer = this.photographers.find((photographer) => photographer.id === id)

    if (typeof photographer === 'undefined') {
      return notFound()
    } else {
      return ok(photographer)
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
    const index = this.photographers.findIndex((photographer) => photographer.id === id)

    this.photographers[index].name = name
    this.photographers[index].cpf = cpf
    this.photographers[index].email = email
    this.photographers[index].telephone = telephone
    this.photographers[index].photos = photos
    this.photographers[index].subscriptionId = subscriptionId
    this.photographers[index].year = year
    this.photographers[index].status = status

    return ok(this.photographers[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.photographers.findIndex((photographer) => photographer.id === id)

    this.photographers.splice(index, 1)

    return ok(this.photographers)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { PhotographerRepositoryInMemory }
