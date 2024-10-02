import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CountPhotographerUseCase } from './count-photographer-use-case'

class CountPhotographerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { 
      search
    } = request.body

    const countPhotographerUseCase = container.resolve(CountPhotographerUseCase)

    const photographersCount = await countPhotographerUseCase.execute({
      search: search as string
    })

    return response.status(photographersCount.statusCode).json(photographersCount)
  }
}

export { CountPhotographerController }
