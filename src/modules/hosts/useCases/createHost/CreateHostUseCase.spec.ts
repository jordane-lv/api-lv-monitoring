import { IHostGroupResponse } from '../../adapters/ICreateHostAdapter';
import { CreateHostUseCase } from './CreateHostUseCase';

const createHostSpy = jest.fn();
const getHostGroupByNameSpy = jest.fn(async (groupName?: string) => {
  const group = { groupId: '1', groupName: 'TST' } as IHostGroupResponse;

  return groupName === 'TST' ? group : null;
});

describe('Create Host', () => {
  const createHost = new CreateHostUseCase({
    create: createHostSpy,
    getHostGroupByName: getHostGroupByNameSpy,
  });

  it('should be able to create a new host', async () => {
    await expect(
      createHost.execute({
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
      createHost.execute({
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
      createHost.execute({
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
      createHost.execute({
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
      createHost.execute({
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
      createHost.execute({
        codigo: '00000',
        sigla: 'TST',
        nome_host: '@ TESTE NOME INVÁLIDO',
        ip: '10.0.0.1',
        tipo: 'switch',
      }),
    ).rejects.toThrow();

    expect(createHostSpy).not.toBeCalled();
  });

  it('should not be able to create a new host with the invalid ip address', async () => {
    await expect(
      createHost.execute({
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
});
