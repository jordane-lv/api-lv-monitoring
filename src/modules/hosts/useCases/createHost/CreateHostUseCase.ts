import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import patterns from '../../../../utils/patterns';
import checks from '../../../../utils/validate';
import { ICreateHostAdapter } from '../../adapters/ICreateHostAdapter';

const hostTypes = [
  'olt',
  'switch',
  'router',
  'wireless',
  'server',
  'pop',
] as const;

type HostType = typeof hostTypes[number];

export interface IRequest {
  codigo: string;
  sigla: string;
  nome_host: string;
  ip: string;
  tipo: HostType;
}

interface IValidatedData {
  name: string;
  ipAddress: string;
  type: HostType;
  groupId: string;
}

@injectable()
export class CreateHostUseCase {
  constructor(
    @inject('CreateHostAdapter')
    private createHostAdapter: ICreateHostAdapter,
  ) {}

  async execute(data: IRequest): Promise<void> {
    const { name, ipAddress, type, groupId } = await this.validateRequestData(
      data,
    );

    await this.createHostAdapter.create({
      name,
      ipAddress,
      type,
      hostGroup: {
        groupId,
      },
    });
  }

  async validateRequestData({
    codigo,
    ip,
    nome_host,
    sigla,
    tipo,
  }: IRequest): Promise<IValidatedData> {
    const validType = hostTypes.some(hostType => hostType === tipo);

    if (!validType) {
      throw new AppError(
        `Tipo de host inválido, são aceitos apenas: ${hostTypes.join(', ')}`,
      );
    }

    if (!nome_host) {
      throw new AppError('O nome do host é obrigatório!');
    }

    if (!ip) {
      throw new AppError('O ip é obrigatório!');
    }

    if (!checks.validIpAddress(ip)) {
      throw new AppError('Formato de IP inválido.');
    }

    if (!checks.validateCode(codigo)) {
      throw new AppError('Formato do código inválido.');
    }

    if (!checks.validateInitial(sigla)) {
      throw new AppError('Formato da sigla inválido.');
    }

    const { groupName, groupId } =
      await this.createHostAdapter.getHostGroupByName(sigla);

    const hostName = patterns.getHostNameFormat({
      code: codigo,
      groupName,
      name: nome_host,
    });

    if (!checks.validHostName(hostName)) {
      throw new AppError('Nome do host inválido!');
    }

    const hosts = await this.createHostAdapter.getHostsByGroupID(groupId);

    if (hosts) {
      const hostAlreadyExists = hosts.some(host => host.name === hostName);

      if (hostAlreadyExists) {
        throw new AppError(`O host com nome ${hostName} já existe.`);
      }

      const ipAlreadyExists = hosts.some(host =>
        host.interfaces.some(hostInterface => hostInterface.ip === ip),
      );

      if (ipAlreadyExists) {
        throw new AppError(`O IP ${ip} já existe.`);
      }
    }

    return {
      name: hostName,
      ipAddress: ip,
      type: tipo,
      groupId,
    };
  }
}
