import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import check from '../../../../utils/validate';
import { ICreateGroupsAdapter } from '../../adapters/ICreateGroupsAdapter';

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

    const hostGroup = await this.createGroupsAdapter.createHostGroup(groupName);

    if (!hostGroup || !hostGroup.groupId) {
      throw new AppError('Não foi possível obter o ID do grupo de hosts.');
    }

    const hostGroupId = hostGroup.groupId;

    const userGroup = await this.createGroupsAdapter.createUserGroup({
      groupName,
      hostGroupId,
    });

    return {
      hostGroupId,
      userGroupId: userGroup.groupId,
    };
  }
}
