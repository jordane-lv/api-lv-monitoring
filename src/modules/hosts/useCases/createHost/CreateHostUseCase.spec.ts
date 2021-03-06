import {
  createHostSpy,
  getHostGroupByNameSpy,
  getHostsByGroupIDSpy,
  clearHostList,
} from '@modules/hosts/adapters/mocks/CreateHostAdapterMock';
import { AppError } from '@shared/errors/AppError';

import { ValidateRequestHostDataUseCase } from '../validateRequestHostData/ValidateRequestHostDataUseCase';
import { IRequest, CreateHostUseCase } from './CreateHostUseCase';

let createHostUseCase: CreateHostUseCase;

describe('Create Host', () => {
  beforeEach(() => {
    createHostUseCase = new CreateHostUseCase(
      {
        create: createHostSpy,
        getHostGroupByName: getHostGroupByNameSpy,
        getHostsByGroupID: getHostsByGroupIDSpy,
      },
      new ValidateRequestHostDataUseCase(),
    );

    clearHostList();
  });

  it('should be able to create a new host', async () => {
    await expect(
      createHostUseCase.execute({
        codigo: '12345',
        sigla: 'TST',
        nome_host: 'TEST HOST',
        ip: '10.0.0.1',
        tipo: 'switch',
      }),
    ).resolves.not.toBeInstanceOf(AppError);

    expect(getHostGroupByNameSpy).toBeCalled();
    expect(createHostSpy).toBeCalled();
  });

  it('should not be possible to register a new host with an empty code', async () => {
    const hostEmptyCode = {
      codigo: '',
      sigla: 'TST',
      nome_host: 'EMPTY CODE',
      ip: '10.0.0.1',
      tipo: 'switch',
    } as IRequest;

    await expect(
      createHostUseCase.execute(hostEmptyCode),
    ).rejects.toBeInstanceOf(AppError);

    expect(createHostSpy).not.toBeCalled();
  });

  it('should not be able to register a new host with an invalid code', async () => {
    const hostInvalidCode = {
      codigo: '123',
      sigla: 'TST',
      nome_host: 'INVALID CODE',
      ip: '10.0.0.1',
      tipo: 'switch',
    } as IRequest;

    await expect(
      createHostUseCase.execute(hostInvalidCode),
    ).rejects.toBeInstanceOf(AppError);

    expect(createHostSpy).not.toBeCalled();
  });

  it('should not be possible to register a new host with the empty initial', async () => {
    const hostEmptyInitial = {
      codigo: '12345',
      sigla: '',
      nome_host: 'EMPTY INITIAL',
      ip: '10.0.0.1',
      tipo: 'switch',
    } as IRequest;

    await expect(
      createHostUseCase.execute(hostEmptyInitial),
    ).rejects.toBeInstanceOf(AppError);

    expect(createHostSpy).not.toBeCalled();
  });

  it('should not be able to create a new host with the invalid initial', async () => {
    const hostInvalidInitial = {
      codigo: '12345',
      sigla: 'TESTE',
      nome_host: 'INVALID INITIAL',
      ip: '10.0.0.1',
      tipo: 'switch',
    } as IRequest;

    await expect(
      createHostUseCase.execute(hostInvalidInitial),
    ).rejects.toBeInstanceOf(AppError);

    expect(getHostGroupByNameSpy).not.toBeCalled();
    expect(createHostSpy).not.toBeCalled();
  });

  it('should not be possible to register a new host with the empty host name', async () => {
    await expect(
      createHostUseCase.execute({
        codigo: '12345',
        sigla: 'TST',
        nome_host: '',
        ip: '10.0.0.1',
        tipo: 'switch',
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(createHostSpy).not.toBeCalled();
  });

  it('should not be able to create a new host with the empty ip address', async () => {
    await expect(
      createHostUseCase.execute({
        codigo: '12345',
        sigla: 'TST',
        nome_host: 'EMPTY IP ADDRESS',
        ip: '',
        tipo: 'switch',
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(createHostSpy).not.toBeCalled();
  });

  it('should not be able to create a new host with the invalid host name', async () => {
    const invalidHostName = {
      codigo: '12345',
      sigla: 'TST',
      nome_host: 'INVALID @ HOST NAME.',
      ip: '10.0.0.1',
      tipo: 'switch',
    } as IRequest;

    await expect(
      createHostUseCase.execute(invalidHostName),
    ).rejects.toBeInstanceOf(AppError);

    expect(createHostSpy).not.toBeCalled();
  });

  it('should not be able to create a new host with the invalid ip address', async () => {
    const hostInvalidIPAddress = {
      codigo: '12345',
      sigla: 'TST',
      nome_host: 'INVALID IP ADDRESS',
      ip: '10.0.0.256',
      tipo: 'switch',
    } as IRequest;

    await expect(
      createHostUseCase.execute(hostInvalidIPAddress),
    ).rejects.toBeInstanceOf(AppError);

    expect(getHostGroupByNameSpy).not.toBeCalled();
    expect(createHostSpy).not.toBeCalled();
  });

  it('should not be possible to register an already existing host', async () => {
    const hostDuplicateTest: IRequest = {
      codigo: '12345',
      sigla: 'TST',
      nome_host: 'DUPLICATED HOST NAME',
      ip: '10.0.0.1',
      tipo: 'switch',
    };

    await createHostUseCase.execute(hostDuplicateTest);

    hostDuplicateTest.ip = '10.0.0.6';

    await expect(
      createHostUseCase.execute(hostDuplicateTest),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be possible to register a host with an existing IP', async () => {
    const existingIpAddress = '10.0.1.10';

    await createHostUseCase.execute({
      codigo: '12345',
      sigla: 'TST',
      nome_host: 'FIRST HOST',
      ip: existingIpAddress,
      tipo: 'switch',
    });

    await expect(
      createHostUseCase.execute({
        codigo: '12345',
        sigla: 'TST',
        nome_host: 'ANOTHER HOST DUPLICATING IP ADDRESS',
        ip: existingIpAddress,
        tipo: 'switch',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
