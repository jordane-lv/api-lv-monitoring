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

export interface ICreateHostAdapter {
  create(data: ICreateHostData): Promise<void>;
  getHostGroupByName(groupName: string): Promise<IHostGroupResponse>;
}
