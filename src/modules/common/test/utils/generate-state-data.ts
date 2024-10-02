import { faker } from '@faker-js/faker'

export function generateNewStateData(overide = {}) {
  return {
    name: faker.datatype.string(100),
    code: faker.datatype.string(2),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateStateData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    name: faker.datatype.string(100),
    code: faker.datatype.string(2),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateStatesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateStateData(overide)
    }
  )
}
