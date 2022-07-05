import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { MassCreateUseCase } from './MassCreateUseCase';

export class MassCreateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const massCreateUseCase = container.resolve(MassCreateUseCase);

    const createdData = await massCreateUseCase.execute(data);

    return response.status(200).json(createdData);
  }
}
