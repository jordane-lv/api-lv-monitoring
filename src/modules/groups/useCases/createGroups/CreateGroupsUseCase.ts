import { inject, injectable } from 'tsyringe';

import { ICreateGroupsAdapter } from '@modules/groups/adapters/ICreateGroupsAdapter';
import { AppError } from '@shared/errors/AppError';
import check from '@utils/validate';

interface IResponse {
  hostGroupId: string;
  userGroupId: string;
}

@injectable()
export class CreateGroupsUseCase {
  constructor(
    @inject('CreateGroupsAdapter')
    private createGroupsAdapter: ICreateGroupsAdapter,
  ) {}

  async execute(groupName: string): Promise<IResponse> {
    if (!check.validateInitial(groupName)) {
      throw new AppError('Nome do grupo inválido.');
    }

    let hostGroup = await this.createGroupsAdapter.getHostGroup(groupName);

    if (!hostGroup) {
      hostGroup = await this.createGroupsAdapter.createHostGroup(groupName);
    }

    const hostGroupId = hostGroup.groupId;

    let userGroup = await this.createGroupsAdapter.getUserGroup(groupName);

    if (!userGroup) {
      userGroup = await this.createGroupsAdapter.createUserGroup({
        groupName,
        hostGroupId,
      });
    }

    return {
      hostGroupId,
      userGroupId: userGroup.groupId,
    };
  }
}
