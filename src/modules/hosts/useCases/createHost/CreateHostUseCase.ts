import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import patterns from '../../../../utils/patterns';
import checks from '../../../../utils/validate';
import { ICreateHostAdapter } from '../../adapters/ICreateHostAdapter';
import { HostType } from '../../types/hostTypes';
import { ValidateRequestHostDataUseCase } from '../validateRequestHostData/ValidateRequestHostDataUseCase';

export interface IRequest {
  codigo: string;
  sigla: string;
  nome_host: string;
  ip: string;
  tipo?: HostType;
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
    @inject('ValidateRequestHostData')
    private validateRequestHostData: ValidateRequestHostDataUseCase,
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
    this.validateRequestHostData.execute({
      codigo,
      sigla,
      nome_host,
      ip,
      tipo,
    });

    const { groupName, groupId } =
      await this.createHostAdapter.getHostGroupByName(sigla);

    const hostName = patterns.getHostNameFormat({
      code: codigo,
      groupName,
      name: nome_host,
    });

    if (!checks.validFormattedHostName(hostName)) {
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
