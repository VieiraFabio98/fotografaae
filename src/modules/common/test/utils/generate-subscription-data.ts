import { faker } from '@faker-js/faker'

export function generateNewSubscriptionData(overide = {}) {
  return {
    name: faker.datatype.string(60),
    descriptionc: faker.datatype.string(),
    duration: faker.datatype.number({ max: 9 }),
    status: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateSubscriptionData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    name: faker.datatype.string(60),
    descriptionc: faker.datatype.string(),
    duration: faker.datatype.number({ max: 9 }),
    status: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateSubscriptionsData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateSubscriptionData(overide)
    }
  )
}
