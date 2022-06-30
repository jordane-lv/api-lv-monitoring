import { AppError } from '../../../../errors/AppError';
import patterns from '../../../../utils/patterns';
import {
  createHostSpy,
  getHostGroupByNameSpy,
  getHostsByGroupIDSpy,
  clearHostList,
} from '../../mocks/CreateHostAdapterMock';
import { ValidateRequestHostDataUseCase } from '../validateRequestHostData/ValidateRequestHostDataUseCase';
import { IRequest, CreateHostUseCase } from './CreateHostUseCase';

describe('Create Host', () => {
  const createHostMock = new CreateHostUseCase(
    {
      create: createHostSpy,
      getHostGroupByName: getHostGroupByNameSpy,
      getHostsByGroupID: getHostsByGroupIDSpy,
    },
    new ValidateRequestHostDataUseCase(),
  );

  beforeEach(() => {
    clearHostList();
  });

  it('should be able to create a new host', async () => {
    await expect(
      createHostMock.execute({
        codigo: '12345',
        sigla: 'TST',
        nome_host: 'TEST HOST',
        ip: '10.0.0.1',
        tipo: 'switch',
      }),
    ).resolves.not.toThrow();

    expect(getHostGroupByNameSpy).toBeCalled();
    expect(createHostSpy).toBeCalled();
  });

  it('should not be possible to register a new host with an empty code', async () => {
    await expect(
      createHostMock.execute({
        codigo: '',
        sigla: 'TST',
        nome_host: 'EMPTY CODE',
        ip: '10.0.0.1',
        tipo: 'switch',
      }),
    ).rejects.toEqual(new AppError('Formato do código inválido.'));

    expect(createHostSpy).not.toBeCalled();
  });

  it('should not be able to register a new host with an invalid code', async () => {
    await expect(
      createHostMock.execute({
        codigo: '123',
        sigla: 'TST',
        nome_host: 'INVALID CODE',
        ip: '10.0.0.1',
        tipo: 'switch',
      }),
    ).rejects.toEqual(new AppError('Formato do código inválido.'));

    expect(createHostSpy).not.toBeCalled();
  });

  it('should not be possible to register a new host with the empty initial', async () => {
    await expect(
      createHostMock.execute({
        codigo: '12345',
        sigla: '',
        nome_host: 'EMPTY INITIAL',
        ip: '10.0.0.1',
        tipo: 'switch',
      }),
    ).rejects.toEqual(new AppError('Formato da sigla inválido.'));

    expect(createHostSpy).not.toBeCalled();
  });

  it('should not be able to create a new host with the invalid initial', async () => {
    await expect(
      createHostMock.execute({
        codigo: '12345',
        sigla: '"',
        nome_host: 'INVALID INITIAL',
        ip: '10.0.0.1',
        tipo: 'switch',
      }),
    ).rejects.toEqual(new AppError('Formato da sigla inválido.'));

    expect(getHostGroupByNameSpy).not.toBeCalled();
    expect(createHostSpy).not.toBeCalled();
  });

  it('should not be possible to register a new host with the empty host name', async () => {
    await expect(
      createHostMock.execute({
        codigo: '12345',
        sigla: 'TST',
        nome_host: '',
        ip: '10.0.0.1',
        tipo: 'switch',
      }),
    ).rejects.toEqual(new AppError('O nome do host é obrigatório!'));

    expect(createHostSpy).not.toBeCalled();
  });

  it('should not be able to create a new host with the empty ip address', async () => {
    await expect(
      createHostMock.execute({
        codigo: '12345',
        sigla: 'TST',
        nome_host: 'EMPTY IP ADDRESS',
        ip: '',
        tipo: 'switch',
      }),
    ).rejects.toEqual(new AppError('O ip é obrigatório!'));

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

    await expect(createHostMock.execute(invalidHostName)).rejects.toEqual(
      new AppError(`Nome do host "${invalidHostName.nome_host}" é inválido.`),
    );

    expect(createHostSpy).not.toBeCalled();
  });

  it('should not be able to create a new host with the invalid ip address', async () => {
    await expect(
      createHostMock.execute({
        codigo: '12345',
        sigla: 'TST',
        nome_host: 'INVALID IP ADDRESS',
        ip: '10.0.0.256',
        tipo: 'switch',
      }),
    ).rejects.toEqual(new AppError('Formato de IP inválido.'));

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

    const hostNamePattern = patterns.getHostNameFormat({
      code: hostDuplicateTest.codigo,
      groupName: hostDuplicateTest.sigla,
      name: hostDuplicateTest.nome_host,
    });

    await createHostMock.execute(hostDuplicateTest);

    hostDuplicateTest.ip = '10.0.0.6';

    await expect(createHostMock.execute(hostDuplicateTest)).rejects.toEqual(
      new AppError(`O host com nome ${hostNamePattern} já existe.`),
    );
  });

  it('should not be possible to register a host with an existing IP', async () => {
    const existingIpAddress = '10.0.1.10';

    await createHostMock.execute({
      codigo: '12345',
      sigla: 'TST',
      nome_host: 'FIRST HOST',
      ip: existingIpAddress,
      tipo: 'switch',
    });

    await expect(
      createHostMock.execute({
        codigo: '12345',
        sigla: 'TST',
        nome_host: 'ANOTHER HOST DUPLICATING IP ADDRESS',
        ip: existingIpAddress,
        tipo: 'switch',
      }),
    ).rejects.toEqual(new AppError(`O IP ${existingIpAddress} já existe.`));
  });
});
