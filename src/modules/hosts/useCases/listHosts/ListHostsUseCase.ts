import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ICreateHostAdapter } from '../../adapters/ICreateHostAdapter';

interface IInterfaces {
  ip: string;
}

interface IResponse {
  hostId: string;
  name: string;
  interfaces: IInterfaces[];
}

@injectable()
export class ListHostsUseCase {
  constructor(
    @inject('CreateHostAdapter')
    private createHostAdapter: ICreateHostAdapter,
  ) {}

  async execute(hostGroupName: string): Promise<IResponse[]> {
    if (!hostGroupName) {
      throw new AppError('O nome do grupo é obrigatório.');
    }

    const { groupId } = await this.createHostAdapter.getHostGroupByName(
      hostGroupName,
    );

    if (!groupId) {
      throw new AppError('Grupo inválido.');
    }

    const hosts = await this.createHostAdapter.getHostsByGroupID(groupId);

    return hosts || [];
  }
}
