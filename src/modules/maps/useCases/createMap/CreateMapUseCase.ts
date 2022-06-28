import { inject, injectable } from 'tsyringe';

import patterns from '../../../../utils/patterns';
import { ICreateMapAdapter } from '../../adapters/ICreateMapAdapter';

interface IRequest {
  codigo: string;
  sigla: string;
  mapName: string;
}

@injectable()
export class CreateMapUseCase {
  constructor(
    @inject('CreateMapAdapter')
    private createMapAdapter: ICreateMapAdapter,
  ) {}

  async execute({ codigo, sigla, mapName }: IRequest) {
    const usersGroup = await this.createMapAdapter.getUserGroupByName(sigla);
    const hostGroup = await this.createMapAdapter.getHostGroupByName(sigla);

    const name = patterns.getMapNameFormat({
      code: codigo,
      groupName: usersGroup.groupName,
      mapName,
    });

    const allHosts = await this.createMapAdapter.getAllHostsByHostGroupId(
      hostGroup.groupId,
    );

    const hostsFilteredByCode = allHosts.filter(host =>
      host.name.trim().startsWith(codigo),
    );

    const hosts = hostsFilteredByCode.map(host => {
      return {
        id: host.hostId,
      };
    });

    await this.createMapAdapter.create({
      name,
      hosts,
      userGroup: {
        id: usersGroup.groupId,
      },
    });
  }
}
