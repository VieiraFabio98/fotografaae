interface IPhotographerDTO {
  id?: string
  name?: string
  lastName?: string
  cpf?: string
  email?: string
  telephone?: string
  photos?: string
  description?: string
  subscriptionId?: string
  year?: Date
  status?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export { IPhotographerDTO }
