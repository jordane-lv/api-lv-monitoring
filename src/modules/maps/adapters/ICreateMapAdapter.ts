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

export interface ICreateMapResponse {
  name: string;
  mapId: string;
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

export interface IMapResponse {
  mapId: string;
  mapName: string;
}

export interface ICreateMapAdapter {
  create(data: ICreateMapData): Promise<ICreateMapResponse>;
  getUserGroupByName(groupName: string): Promise<IGroupResponse>;
  getHostGroupByName(groupName: string): Promise<IGroupResponse>;
  getAllHostsByHostGroupId(groupId: string): Promise<IHostResponse[]>;
  getAllMapsByUserGroupId(groupId: string): Promise<IMapResponse[]>;
}
