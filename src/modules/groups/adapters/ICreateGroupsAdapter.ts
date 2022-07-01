export interface ICreateUserGroupData {
  groupName: string;
  hostGroupId: string;
}

export interface ICreateGroupResponse {
  groupId: string;
}

export interface ICreateGroupsAdapter {
  createHostGroup(groupName: string): Promise<ICreateGroupResponse>;
  createUserGroup(data: ICreateUserGroupData): Promise<ICreateGroupResponse>;
}
