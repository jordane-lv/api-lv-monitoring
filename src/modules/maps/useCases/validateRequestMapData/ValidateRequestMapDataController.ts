import { Request, Response } from 'express';

import {
  IRequestValidateRequestMapData,
  ValidateRequestMapDataUseCase,
} from './ValidateRequestMapDataUseCase';

const validateRequestMapData = new ValidateRequestMapDataUseCase();

export class ValidateRequestMapDataController {
  handle(request: Request, response: Response): Response {
    const maps: IRequestValidateRequestMapData[] = request.body;

    maps.forEach(map => {
      const { codigo, sigla, nome_mapa } = map;

      validateRequestMapData.execute({
        codigo,
        sigla,
        nome_mapa,
      });
    });

    return response.status(200).send();
  }
}
