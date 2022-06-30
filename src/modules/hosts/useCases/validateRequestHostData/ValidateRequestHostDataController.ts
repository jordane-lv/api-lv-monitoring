import { Request, Response } from 'express';

import {
  IRequestValidateHostData,
  ValidateRequestHostDataUseCase,
} from './ValidateRequestHostDataUseCase';

const validateRequestHostData = new ValidateRequestHostDataUseCase();

export class ValidateRequestHostDataController {
  handle(request: Request, response: Response): Response {
    const hosts: IRequestValidateHostData[] = request.body;

    hosts.forEach(host => {
      const { codigo, sigla, nome_host, ip, tipo } = host;

      validateRequestHostData.execute({
        codigo,
        sigla,
        nome_host,
        ip,
        tipo,
      });
    });

    return response.status(200).send();
  }
}
