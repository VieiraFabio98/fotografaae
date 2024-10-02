import { faker } from '@faker-js/faker'

export function generateNewPhotographerData(overide = {}) {
  return {
    name: faker.datatype.string(100),
    cpf: faker.datatype.string(100),
    email: faker.datatype.string(100),
    telephone: faker.datatype.string(100),
    photos: faker.datatype.string(100),
    subscriptionId: faker.datatype.string(),
    status: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePhotographerData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    name: faker.datatype.string(100),
    cpf: faker.datatype.string(100),
    email: faker.datatype.string(100),
    telephone: faker.datatype.string(100),
    photos: faker.datatype.string(100),
    subscriptionId: faker.datatype.string(),
    status: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePhotographersData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generatePhotographerData(overide)
    }
  )
}
