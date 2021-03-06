import { inject, injectable } from 'tsyringe';

import { ICreateMapAdapter } from '@modules/maps/adapters/ICreateMapAdapter';
import { AppError } from '@shared/errors/AppError';
import patterns from '@utils/patterns';

import { ValidateRequestMapDataUseCase } from '../validateRequestMapData/ValidateRequestMapDataUseCase';

interface IRequest {
  codigo: string;
  sigla: string;
  mapName: string;
}

interface IResponse {
  name: string;
  mapId: string;
}

@injectable()
export class CreateMapUseCase {
  constructor(
    @inject('CreateMapAdapter')
    private createMapAdapter: ICreateMapAdapter,
    @inject('ValidateRequestMapData')
    private validateRequestMapDataUseCase: ValidateRequestMapDataUseCase,
  ) {}

  async execute({ codigo, sigla, mapName }: IRequest): Promise<IResponse> {
    this.validateRequestMapDataUseCase.execute({
      codigo,
      sigla,
      nome_mapa: mapName,
    });

    const usersGroup = await this.createMapAdapter.getUserGroupByName(sigla);
    const hostsGroup = await this.createMapAdapter.getHostGroupByName(sigla);

    const name = patterns.getMapNameFormat({
      code: codigo,
      groupName: usersGroup.groupName,
      mapName,
    });

    const existingMaps = await this.createMapAdapter.getAllMapsByUserGroupId(
      usersGroup.groupId,
    );

    const mapAlreadyExists = existingMaps.some(map => map.mapName === name);

    if (mapAlreadyExists) {
      throw new AppError(`O mapa com nome ${name} já existe.`);
    }

    const allHosts = await this.createMapAdapter.getAllHostsByHostGroupId(
      hostsGroup.groupId,
    );

    const hostsFilteredByCode = allHosts.filter(host =>
      host.name.trim().startsWith(codigo),
    );

    if (!hostsFilteredByCode || hostsFilteredByCode.length === 0) {
      throw new AppError(
        'Não existem hosts cadastrados com o mesmo código do mapa.',
      );
    }

    const hosts = hostsFilteredByCode.map(host => {
      return {
        id: host.hostId,
      };
    });

    const createdMap = await this.createMapAdapter.create({
      name,
      hosts,
      userGroup: {
        id: usersGroup.groupId,
      },
    });

    return {
      name: createdMap.name,
      mapId: createdMap.mapId,
    };
  }
}
