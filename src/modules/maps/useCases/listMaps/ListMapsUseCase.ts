import { inject, injectable } from 'tsyringe';

import { ICreateMapAdapter } from '@modules/maps/adapters/ICreateMapAdapter';
import { AppError } from '@shared/errors/AppError';

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
    if (!userGroupName) {
      throw new AppError('O nome do grupo é obrigatório.');
    }

    const { groupId } = await this.createMapAdapter.getUserGroupByName(
      userGroupName,
    );

    if (!groupId) {
      throw new AppError('Grupo inválido.');
    }

    const maps = await this.createMapAdapter.getAllMapsByUserGroupId(groupId);

    return maps;
  }
}
