export interface ICreateHostData {
  name: string;
  ipAddress: string;
  type: string;
  hostGroup: {
    groupName?: string;
    groupId: string;
  };
}

export interface IHostGroupResponse {
  groupName: string;
  groupId: string;
}

export interface IHostResponse {
  hostid: string;
  host: string;
  name: string;
  interfaces: { ip: string }[];
}

export interface ICreateHostAdapter {
  create(data: ICreateHostData): Promise<void>;
  getHostGroupByName(groupName: string): Promise<IHostGroupResponse>;
  getHostsByGroupID(groupId: string): Promise<IHostResponse[]>;
}
