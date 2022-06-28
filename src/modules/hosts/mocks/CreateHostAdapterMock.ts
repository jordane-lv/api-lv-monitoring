import {
  ICreateHostData,
  IHostGroupResponse,
  IHostResponse,
} from '../adapters/ICreateHostAdapter';

const hosts: IHostResponse[] = [];

const createHostSpy = jest.fn(async ({ name, ipAddress }: ICreateHostData) => {
  hosts.push({
    name,
    hostId: 'mock',
    interfaces: [
      {
        ip: ipAddress,
      },
    ],
  });
});

const getHostGroupByNameSpy = jest.fn(async (groupName?: string) => {
  const group = { groupId: '1', groupName: 'TST' } as IHostGroupResponse;

  return groupName === 'TST' ? group : null;
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
