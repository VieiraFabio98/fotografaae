import { faker } from '@faker-js/faker'

export function generateNewPhotographerCategorieData(overide = {}) {
  return {
    photographerId: faker.datatype.string(),
    categorieId: faker.datatype.string(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePhotographerCategorieData(overide = {}) {
  return {
    id: faker.datatype.uuid(),
    photographerId: faker.datatype.string(),
    categorieId: faker.datatype.string(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overide
  }
}

export function generatePhotographersCategoriesData(n: number = 1, overide = {}) {
  return Array.from(
    {
      length: n,
    },
    (_, i) => {
      return generatePhotographerCategorieData(overide)
    }
  )
}
