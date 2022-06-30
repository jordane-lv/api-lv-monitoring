import { AppError } from '../../../../errors/AppError';
import checks from '../../../../utils/validate';
import { hostTypes, HostType } from '../../types/hostTypes';

export interface IRequestValidateHostData {
  codigo: string;
  sigla: string;
  nome_host: string;
  ip: string;
  tipo?: HostType;
}

export class ValidateRequestHostDataUseCase {
  execute({ codigo, sigla, nome_host, ip, tipo }: IRequestValidateHostData) {
    if (tipo) {
      const validType = hostTypes.some(hostType => hostType === tipo);

      if (!validType) {
        throw new AppError(
          `Tipo de host inválido, são aceitos apenas: ${hostTypes.join(', ')}`,
        );
      }
    }

    if (!nome_host) {
      throw new AppError('O nome do host é obrigatório!');
    }

    if (!ip) {
      throw new AppError('O ip é obrigatório!');
    }

    if (!checks.validIpAddress(ip)) {
      throw new AppError(`Formato do IP "${ip}" inválido.`);
    }

    if (!checks.validateCode(codigo)) {
      throw new AppError(`Formato do código "${codigo}" inválido.`);
    }

    if (!checks.validateInitial(sigla)) {
      throw new AppError(`Formato da sigla "${sigla}" inválido.`);
    }

    if (!checks.validHostName(nome_host)) {
      throw new AppError(`Nome do host "${nome_host}" é inválido.`);
    }
  }
}
