import { faker } from '@faker-js/faker'

export function generateNewCategorieData(overide = {}) {
  return {
    name: faker.datatype.string(60),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCategorieData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    name: faker.datatype.string(60),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generateCategoriesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generateCategorieData(overide)
    }
  )
}
