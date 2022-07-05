import { inject, injectable } from 'tsyringe';

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
    const { groupId } = await this.createHostAdapter.getHostGroupByName(
      hostGroupName,
    );

    const hosts = await this.createHostAdapter.getHostsByGroupID(groupId);

    return hosts || [];
  }
}
