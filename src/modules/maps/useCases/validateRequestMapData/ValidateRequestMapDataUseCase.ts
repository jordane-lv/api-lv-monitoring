import { AppError } from '../../../../errors/AppError';
import checks from '../../../../utils/validate';

export interface IRequestValidateRequestMapData {
  codigo: string;
  sigla: string;
  nome_mapa: string;
}

export class ValidateRequestMapDataUseCase {
  execute({ codigo, sigla, nome_mapa }: IRequestValidateRequestMapData) {
    if (!nome_mapa) {
      throw new AppError('O nome do mapa é obrigatório!');
    }

    if (!checks.validateCode(codigo)) {
      throw new AppError('Formato de código inválido.');
    }

    if (!checks.validateInitial(sigla)) {
      throw new AppError('Formato da sigla inválido.');
    }
  }
}