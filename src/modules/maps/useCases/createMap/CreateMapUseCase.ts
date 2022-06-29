import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import patterns from '../../../../utils/patterns';
import checks from '../../../../utils/validate';
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
    if (!mapName) {
      throw new AppError('O nome do mapa é obrigatório!');
    }

    if (!checks.validateCode(codigo)) {
      throw new AppError('Formato de código inválido.');
    }

    if (!checks.validateInitial(sigla)) {
      throw new AppError('Formato da sigla inválido.');
    }

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

    await this.createMapAdapter.create({
      name,
      hosts,
      userGroup: {
        id: usersGroup.groupId,
      },
    });
  }
}
