import {
  IHostResponse,
  IMapResponse,
  ICreateMapData,
  ICreateMapResponse,
} from '../ICreateMapAdapter';

const maps: IMapResponse[] = [];

const createMapSpy = jest.fn(
  async ({ name }: ICreateMapData): Promise<ICreateMapResponse> => {
    const map = {
      mapId: `${name} - ID MAP`,
      mapName: name,
    };

    maps.push(map);

    return {
      name,
      mapId: map.mapId,
    };
  },
);

const getHostGroupByNameSpy = jest.fn(async (groupName: string) => {
  const group = { groupId: 'teste', groupName: 'TST' };

  return groupName === 'TST' && group;
});

const getUserGroupByNameSpy = jest.fn(async (groupName: string) => {
  const group = { groupId: 'teste', groupName: 'TST' };

  return groupName === 'TST' && group;
});

const getAllHostsByHostGroupIdSpy = jest.fn(
  async (groupId: string): Promise<IHostResponse[]> => {
    return (
      groupId === 'teste' && [
        {
          hostId: 'id-teste',
          name: '12345 teste',
          interfaces: [{ ip: 'ip-teste' }],
        },
      ]
    );
  },
);

const getAllMapsByUserGroupIdSpy = jest.fn(
  async (): Promise<IMapResponse[]> => maps,
);

export {
  createMapSpy,
  getAllHostsByHostGroupIdSpy,
  getHostGroupByNameSpy,
  getUserGroupByNameSpy,
  getAllMapsByUserGroupIdSpy,
};
