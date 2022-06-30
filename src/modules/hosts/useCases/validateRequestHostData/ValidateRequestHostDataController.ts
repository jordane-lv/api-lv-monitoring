import { Request, Response } from 'express';

import {
  IRequestValidateHostData,
  ValidateRequestHostDataUseCase,
} from './ValidateRequestHostDataUseCase';

export class ValidateRequestHostDataController {
  handle(request: Request, response: Response): Response {
    const { codigo, sigla, nome_host, ip, tipo }: IRequestValidateHostData =
      request.body;

    const validateRequestHostData = new ValidateRequestHostDataUseCase();

    validateRequestHostData.execute({
      codigo,
      sigla,
      nome_host,
      ip,
      tipo,
    });

    return response
      .status(200)
      .json({ status: 'ok', message: 'Todos os dados estão corretos.' });
  }
}
