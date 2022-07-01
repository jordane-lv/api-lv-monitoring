import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateGroupsUseCase } from './CreateGroupsUseCase';

export class CreateGroupsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { sigla } = request.body;

    const createGroupsUseCase = container.resolve(CreateGroupsUseCase);

    const { hostGroupId, userGroupId } = await createGroupsUseCase.execute(
      sigla,
    );

    return response.status(201).json({
      hostGroupId,
      userGroupId,
    });
  }
}
