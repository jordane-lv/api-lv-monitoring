import { inject, injectable } from 'tsyringe';

import { CreateGroupsUseCase } from '../../groups/useCases/createGroups/CreateGroupsUseCase';
import { HostType } from '../../hosts/types/hostTypes';
import { CreateHostUseCase } from '../../hosts/useCases/createHost/CreateHostUseCase';
import { CreateMapUseCase } from '../../maps/useCases/createMap/CreateMapUseCase';

interface IHost {
  nome_host: string;
  ip: string;
  tipo: HostType;
  status?: {
    message: string;
    statusCode?: number;
  };
}

interface IMap {
  nome_mapa: string;
  hosts: IHost[];
  status: {
    message: string;
    statusCode?: number;
  };
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
          host.status.message = 'Criado';
        } catch (error) {
          host.status = error;
        }
      }

      const newMap = { codigo: mapCode, sigla, mapName };

      try {
        await this.createMap.execute(newMap);
        mapa.status.message = 'Criado';
      } catch (error) {
        mapa.status = error;
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
