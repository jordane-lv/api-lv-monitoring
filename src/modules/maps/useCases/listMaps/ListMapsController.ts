import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListMapsUseCase } from './ListMapsUseCase';

export class ListMapsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { sigla } = request.params;

    const listMapsUseCase = container.resolve(ListMapsUseCase);

    const maps = await listMapsUseCase.execute(sigla);

    return response.json({ maps });
  }
}
