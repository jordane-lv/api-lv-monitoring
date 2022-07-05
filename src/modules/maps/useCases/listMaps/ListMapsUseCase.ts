import { inject, injectable } from 'tsyringe';

import { ICreateMapAdapter } from '../../adapters/ICreateMapAdapter';

interface IResponse {
  mapId: string;
  mapName: string;
}

@injectable()
export class ListMapsUseCase {
  constructor(
    @inject('CreateMapAdapter')
    private createMapAdapter: ICreateMapAdapter,
  ) {}

  async execute(userGroupName: string): Promise<IResponse[]> {
    const { groupId } = await this.createMapAdapter.getUserGroupByName(
      userGroupName,
    );

    const maps = await this.createMapAdapter.getAllMapsByUserGroupId(groupId);

    return maps;
  }
}
