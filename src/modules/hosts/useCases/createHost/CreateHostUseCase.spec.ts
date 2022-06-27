import {
  createHostSpy,
  getHostGroupByNameSpy,
  getHostsByGroupIDSpy,
  clearHostList,
} from '../../mocks/CreateHostAdapterMock';
import { IRequest, CreateHostUseCase } from './CreateHostUseCase';

describe('Create Host', () => {
  const createHostMock = new CreateHostUseCase({
    create: createHostSpy,
    getHostGroupByName: getHostGroupByNameSpy,
    getHostsByGroupID: getHostsByGroupIDSpy,
  });

  beforeEach(() => {
    clearHostList();
  });

  it('should be able to create a new host', async () => {
    await expect(
      createHostMock.execute({
        codigo: '00000',
        sigla: 'TST',
        nome_host: 'HOST DE TESTE',
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
        nome_host: 'HOST DE TESTE',
        ip: '10.0.0.1',
        tipo: 'switch',
      }),
    ).rejects.toThrow();

    expect(createHostSpy).not.toBeCalled();
  });

  it('should not be possible to register a new host with the empty acronym', async () => {
    await expect(
      createHostMock.execute({
        codigo: '00000',
        sigla: '',
        nome_host: 'HOST DE TESTE',
        ip: '10.0.0.1',
        tipo: 'switch',
      }),
    ).rejects.toThrow();

    expect(createHostSpy).not.toBeCalled();
  });

  it('should not be possible to register a new host with the empty host name', async () => {
    await expect(
      createHostMock.execute({
        codigo: '00000',
        sigla: 'TST',
        nome_host: '',
        ip: '10.0.0.1',
        tipo: 'switch',
      }),
    ).rejects.toThrow();

    expect(createHostSpy).not.toBeCalled();
  });

  it('should not be able to create a new host with the empty ip address', async () => {
    await expect(
      createHostMock.execute({
        codigo: '00000',
        sigla: 'TST',
        nome_host: 'HOST DE TESTE',
        ip: '',
        tipo: 'switch',
      }),
    ).rejects.toThrow();

    expect(createHostSpy).not.toBeCalled();
  });

  it('should not be able to create a new host with the invalid host name', async () => {
    await expect(
      createHostMock.execute({
        codigo: '00000',
        sigla: 'TST',
        nome_host: 'TESTE @ NOME INVÁLIDO.',
        ip: '10.0.0.1',
        tipo: 'switch',
      }),
    ).rejects.toThrow();

    expect(createHostSpy).not.toBeCalled();
  });

  it('should not be able to create a new host with the invalid ip address', async () => {
    await expect(
      createHostMock.execute({
        codigo: '00000',
        sigla: 'TST',
        nome_host: 'HOST DE TESTE',
        ip: '10.0.0.256',
        tipo: 'switch',
      }),
    ).rejects.toThrow();

    expect(getHostGroupByNameSpy).not.toBeCalled();
    expect(createHostSpy).not.toBeCalled();
  });

  it('should not be possible to register an already existing host', async () => {
    const hostDuplicateTest: IRequest = {
      codigo: '00000',
      sigla: 'TST',
      nome_host: 'TESTE NOME DUPLICADO',
      ip: '10.0.0.1',
      tipo: 'switch',
    };

    await createHostMock.execute(hostDuplicateTest);

    hostDuplicateTest.ip = '10.0.0.6';

    await expect(createHostMock.execute(hostDuplicateTest)).rejects.toThrow();
  });

  it('should not be possible to register a host with an existing IP', async () => {
    const ipAddress = '10.0.1.10';

    await createHostMock.execute({
      codigo: '00000',
      sigla: 'TST',
      nome_host: 'NOME DO HOST',
      ip: ipAddress,
      tipo: 'switch',
    });

    await expect(
      createHostMock.execute({
        codigo: '00000',
        sigla: 'TST',
        nome_host: 'OUTRO HOST',
        ip: ipAddress,
        tipo: 'switch',
      }),
    ).rejects.toThrow();
  });
});
