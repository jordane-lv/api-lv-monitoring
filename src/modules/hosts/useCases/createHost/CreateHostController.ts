import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateHostUseCase } from './CreateHostUseCase';

export class CreateHostController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { codigo, sigla, ip, nome_host, tipo } = request.body;

      const createHostUseCase = container.resolve(CreateHostUseCase);

      await createHostUseCase.execute({
        codigo,
        sigla,
        ip,
        nome_host,
        tipo,
      });

      return response.status(201).send();
    } catch (error) {
      return response.status(400).json({
        type: 'error',
        message: error.message,
      });
    }
  }
}
