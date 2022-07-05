export interface ICreateHostData {
  name: string;
  ipAddress: string;
  type?: string;
  hostGroup: {
    groupName?: string;
    groupId: string;
  };
}

export interface ICreateHostResponse {
  name: string;
  hostId: string;
}

export interface IHostGroupResponse {
  groupName: string;
  groupId: string;
}

export interface IHostResponse {
  hostId: string;
  name: string;
  interfaces: { ip: string }[];
}

export interface ICreateHostAdapter {
  create(data: ICreateHostData): Promise<ICreateHostResponse>;
  getHostGroupByName(groupName: string): Promise<IHostGroupResponse>;
  getHostsByGroupID(hostGroupId: string): Promise<IHostResponse[]>;
}
