import { inject, injectable } from 'tsyringe';

import { CreateGroupsUseCase } from '@modules/groups/useCases/createGroups/CreateGroupsUseCase';
import { HostType } from '@modules/hosts/types/hostTypes';
import { CreateHostUseCase } from '@modules/hosts/useCases/createHost/CreateHostUseCase';
import { CreateMapUseCase } from '@modules/maps/useCases/createMap/CreateMapUseCase';

type ResponseStatus = {
  type: string;
  message: string;
  statusCode?: number;
};

interface IHost {
  nome_host: string;
  ip: string;
  tipo: HostType;
  status?: ResponseStatus;
}

interface IMap {
  nome_mapa: string;
  hosts: IHost[];
  status?: ResponseStatus;
}

export interface IMassCreateData {
  codigo: string;
  sigla: string;
  mapas: IMap[];
}

@injectable()
export class MassCreateUseCase {
  constructor(
    @inject('CreateGroupsUseCase')
    private createGroups: CreateGroupsUseCase,
    @inject('CreateHostUseCase')
    private createHost: CreateHostUseCase,
    @inject('CreateMapUseCase')
    private createMap: CreateMapUseCase,
  ) {}

  async execute(data: IMassCreateData): Promise<IMassCreateData> {
    const { codigo, sigla, mapas } = data;

    const mapsWithHosts = mapas.filter((mapa, index) => {
      if (mapa.hosts.length > 0) {
        return true;
      }

      mapas[index].status = {
        type: 'error',
        message: 'Não foi criado, pois não existem hosts neste mapa.',
      };

      return false;
    });

    await this.createGroups.execute(sigla);

    for await (const mapa of mapsWithHosts) {
      const { nome_mapa: mapName, hosts } = mapa;

      const mapIndex = mapsWithHosts.indexOf(mapa);
      const mapCode = this.getSubmapCode(codigo, mapIndex);

      for await (const host of hosts) {
        const { nome_host, ip, tipo } = host;

        const newHost = { codigo: mapCode, sigla, nome_host, ip, tipo };

        try {
          await this.createHost.execute(newHost);

          host.status = {
            type: 'ok',
            message: 'Criado',
          };
        } catch (error) {
          host.status = {
            type: 'error',
            message: error.message,
            statusCode: error.statusCode,
          };
        }
      }

      const newMap = { codigo: mapCode, sigla, mapName };

      try {
        await this.createMap.execute(newMap);

        mapa.status = {
          type: 'ok',
          message: 'Criado',
        };
      } catch (error) {
        mapa.status = {
          type: 'error',
          message: error.message,
          statusCode: error.statusCode,
        };
      }
    }

    return data;
  }

  private getSubmapCode(code: string, index: number): string {
    if (index === 0) {
      return code;
    }

    const alteredCode = `0000000000${parseInt(code, 10) + index}`;

    return alteredCode.substring(
      alteredCode.length,
      alteredCode.length - code.length,
    );
  }
}
