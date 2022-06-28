type HostData = {
  id: string;
};

export interface ICreateMapData {
  name: string;
  hosts: HostData[];
  userGroup: {
    id: string;
  };
}

export interface IGroupResponse {
  groupName: string;
  groupId: string;
}

export interface IHostResponse {
  hostId: string;
  name: string;
  interfaces: { ip: string }[];
}

export interface ICreateMapAdapter {
  create(data: ICreateMapData): Promise<void>;
  getUserGroupByName(groupName: string): Promise<IGroupResponse>;
  getHostGroupByName(groupName: string): Promise<IGroupResponse>;
  getAllHostsByHostGroupId(groupId: string): Promise<IHostResponse[]>;
}
