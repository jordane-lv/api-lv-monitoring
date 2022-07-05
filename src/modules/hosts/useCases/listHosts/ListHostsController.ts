import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListHostsUseCase } from './ListHostsUseCase';

export class ListHostsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { sigla } = request.params;

    const listHostsUseCase = container.resolve(ListHostsUseCase);

    const hosts = await listHostsUseCase.execute(sigla);

    return response.json({ hosts });
  }
}
