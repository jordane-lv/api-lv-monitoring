import { Request, Response } from 'express';

import { CreateHostUseCase } from './CreateHostUseCase';

export class CreateHostController {
  constructor(private createHostUseCase: CreateHostUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { codigo, sigla, ip, nome_host, tipo } = request.body;

    await this.createHostUseCase.execute({
      codigo,
      sigla,
      ip,
      nome_host,
      tipo,
    });

    return response.status(201).send();
  }
}
