import { Request, Response } from 'express';

import {
  IRequestValidateRequestMapData,
  ValidateRequestMapDataUseCase,
} from './ValidateRequestMapDataUseCase';

export class ValidateRequestMapDataController {
  handle(request: Request, response: Response): Response {
    const { codigo, sigla, nome_mapa }: IRequestValidateRequestMapData =
      request.body;

    const validateRequestMapData = new ValidateRequestMapDataUseCase();

    validateRequestMapData.execute({
      codigo,
      sigla,
      nome_mapa,
    });

    return response
      .status(200)
      .json({ status: 'ok', message: 'Os dados do mapa estão corretos.' });
  }
}
