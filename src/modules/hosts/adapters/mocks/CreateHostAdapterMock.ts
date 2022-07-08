import {
  ICreateHostData,
  ICreateHostResponse,
  IHostGroupResponse,
  IHostResponse,
} from '../ICreateHostAdapter';

const hosts: IHostResponse[] = [];

const createHostSpy = jest.fn(
  async ({
    name,
    ipAddress,
  }: ICreateHostData): Promise<ICreateHostResponse> => {
    const host = {
      name,
      hostId: 'mock',
      interfaces: [
        {
          ip: ipAddress,
        },
      ],
    };

    hosts.push(host);

    return {
      name,
      hostId: host.hostId,
    };
  },
);

const getHostGroupByNameSpy = jest.fn(async (groupName?: string) => {
  const group = { groupId: 'teste', groupName: 'TST' } as IHostGroupResponse;

  return groupName === 'TST' && group;
});

const getHostsByGroupIDSpy = jest.fn(
  async (groupId: string): Promise<IHostResponse[]> => {
    return hosts;
  },
);

const clearHostList = () => {
  hosts.splice(0, hosts.length);
};

export {
  createHostSpy,
  getHostGroupByNameSpy,
  getHostsByGroupIDSpy,
  clearHostList,
};
