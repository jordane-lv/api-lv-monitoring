import { inject, injectable } from 'tsyringe';

import validate from '../../../../utils/validate';
import { ICreateHostAdapter } from '../../adapters/ICreateHostAdapter';

interface IRequest {
  codigo: string;
  sigla: string;
  nome_host: string;
  ip: string;
  tipo: 'olt' | 'switch' | 'router' | 'wireless' | 'server' | 'pop';
}

@injectable()
export class CreateHostUseCase {
  constructor(
    @inject('CreateHostAdapter')
    private createHostAdapter: ICreateHostAdapter,
  ) {}

  async execute({ codigo, sigla, ip, nome_host, tipo }: IRequest) {
    if (!codigo) {
      throw new Error('O código é obrigatório!');
    }

    if (!nome_host) {
      throw new Error('O nome do host é obrigatório!');
    }

    if (!ip) {
      throw new Error('O ip é obrigatório!');
    }

    if (!validate.validateIpAddress(ip)) {
      throw new Error('Formato de IP inválido.');
    }

    const { groupName, groupId } =
      await this.createHostAdapter.getHostGroupByName(sigla);

    const hostName = `${codigo.toUpperCase().trim()} ${groupName
      .toUpperCase()
      .trim()} - ${nome_host.toUpperCase().trim()}`;

    if (!validate.validateHostName(hostName)) {
      throw new Error('Nome do host inválido!');
    }

    await this.createHostAdapter.create({
      name: hostName,
      ipAddress: ip,
      type: tipo,
      hostGroup: {
        groupId,
      },
    });
  }
}
