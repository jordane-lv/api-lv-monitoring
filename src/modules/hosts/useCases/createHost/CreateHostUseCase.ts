import { inject, injectable } from 'tsyringe';

import { ICreateHostAdapter } from '@modules/hosts/adapters/ICreateHostAdapter';
import { HostType } from '@modules/hosts/types/hostTypes';
import { AppError } from '@shared/errors/AppError';
import patterns from '@utils/patterns';

import { ValidateRequestHostDataUseCase } from '../validateRequestHostData/ValidateRequestHostDataUseCase';

export interface IRequest {
  codigo: string;
  sigla: string;
  nome_host: string;
  ip: string;
  tipo?: HostType;
}

interface IResponse {
  name: string;
  hostId: string;
}

interface IValidatedDataResponse {
  name: string;
  ipAddress: string;
  type: HostType;
  hostGroupId: string;
}

@injectable()
export class CreateHostUseCase {
  constructor(
    @inject('CreateHostAdapter')
    private createHostAdapter: ICreateHostAdapter,
    @inject('ValidateRequestHostData')
    private validateRequestHostData: ValidateRequestHostDataUseCase,
  ) {}

  async execute(data: IRequest): Promise<IResponse> {
    const { name, ipAddress, type, hostGroupId } =
      await this.validateRequestData(data);

    const createdHost = await this.createHostAdapter.create({
      name,
      ipAddress,
      type,
      hostGroup: {
        groupId: hostGroupId,
      },
    });

    return {
      name: createdHost.name,
      hostId: createdHost.hostId,
    };
  }

  async validateRequestData({
    codigo,
    ip,
    nome_host,
    sigla,
    tipo,
  }: IRequest): Promise<IValidatedDataResponse> {
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
      hostGroupId: groupId,
    };
  }
}
