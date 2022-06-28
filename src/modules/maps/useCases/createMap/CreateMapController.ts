import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateMapUseCase } from './CreateMapUseCase';

export class CreateMapController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { codigo, sigla, nome_mapa } = request.body;

    const createMapUseCase = container.resolve(CreateMapUseCase);

    await createMapUseCase.execute({
      codigo,
      sigla,
      mapName: nome_mapa,
    });

    return response.status(201).send();
  }
}
