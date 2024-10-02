import { ISubscriptionDTO } from '@modules/common/dtos/i-subscription-dto'
import { ISubscriptionRepository } from '@modules/common/repositories/i-subscription-repository'
import { Subscription } from '@modules/common/infra/typeorm/entities/subscription'
import { ok, notFound, HttpResponse } from '@shared/helpers'

class SubscriptionRepositoryInMemory implements ISubscriptionRepository {
  subscriptions: Subscription[] = []

  // create
  async create ({
    name,
    price,
    descriptionc,
    duration,
    status
  }: ISubscriptionDTO): Promise<HttpResponse> {
    const subscription = new Subscription()

    Object.assign(subscription, {
      name,
      price,
      descriptionc,
      duration,
      status
    })

    this.subscriptions.push(subscription)

    return ok(subscription)
  }


  // list
  async list (
    search: string,
    page: number,
    rowsPerPage: number,
    order: string
  ): Promise<HttpResponse> {
    let filteredSubscriptions = this.subscriptions

    filteredSubscriptions = filteredSubscriptions.filter((subscription) => {

      return false
    })

    return ok(filteredSubscriptions.slice((page - 1) * rowsPerPage, page * rowsPerPage))
  }


  // select
  async select (filter: string): Promise<HttpResponse> {
    let filteredSubscriptions = this.subscriptions

    filteredSubscriptions = filteredSubscriptions.filter((subscription) => {

      return false
    })

    return ok(filteredSubscriptions)
  }


  //
  // id select
  idSelect(id: string): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }


  // count
  async count (search: string,): Promise<HttpResponse> {
    let filteredSubscriptions = this.subscriptions

    filteredSubscriptions = filteredSubscriptions.filter((subscription) => {

      return false
    })

    return ok(filteredSubscriptions.length)
  }


  // get
  async get (id: string): Promise<HttpResponse> {
    const subscription = this.subscriptions.find((subscription) => subscription.id === id)

    if (typeof subscription === 'undefined') {
      return notFound()
    } else {
      return ok(subscription)
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
    const index = this.subscriptions.findIndex((subscription) => subscription.id === id)

    this.subscriptions[index].name = name
    this.subscriptions[index].price = price
    this.subscriptions[index].descriptionc = descriptionc
    this.subscriptions[index].duration = duration
    this.subscriptions[index].status = status

    return ok(this.subscriptions[index])
  }


  // delete
  async delete (id: string): Promise<HttpResponse> {
    const index = this.subscriptions.findIndex((subscription) => subscription.id === id)

    this.subscriptions.splice(index, 1)

    return ok(this.subscriptions)
  }


  // multi delete
  multiDelete(ids: string[]): Promise<HttpResponse<any>> {
    throw new Error('Method not implemented.')
  }
}

export { SubscriptionRepositoryInMemory }
