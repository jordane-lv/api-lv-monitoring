export interface ICreateUserGroupData {
  groupName: string;
  hostGroupId: string;
}

export interface ICreateGroupResponse {
  groupName?: string;
  groupId: string;
}

export interface ICreateGroupsAdapter {
  createHostGroup(groupName: string): Promise<ICreateGroupResponse>;
  getHostGroup(groupName: string): Promise<ICreateGroupResponse | null>;

  createUserGroup(data: ICreateUserGroupData): Promise<ICreateGroupResponse>;
  getUserGroup(groupName: string): Promise<ICreateGroupResponse | null>;
}
