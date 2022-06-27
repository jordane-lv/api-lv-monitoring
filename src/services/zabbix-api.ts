import axios, { AxiosResponse } from 'axios';

interface IRequest {
  method: string;
  params: object;
}

export class ZabbixApi {
  private url: string;
  private auth: string;

  constructor() {
    const { ZBX_URL, ZBX_TOKEN } = process.env;

    if (!ZBX_URL) {
      throw new Error('Zabbix Url not found!');
    }

    if (!ZBX_TOKEN) {
      throw new Error('Zabbix Api Token not found!');
    }

    this.url = ZBX_URL;
    this.auth = ZBX_TOKEN;
  }

  execute({ method, params }: IRequest): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      const auth = method === 'apiinfo.version' ? null : this.auth;

      const data = {
        jsonrpc: '2.0',
        method,
        params,
        auth,
        id: 1,
      };

      axios
        .post(this.url, data)
        .then(response => {
          resolve(response);
        })
        .catch(error => reject(error));
    });
  }
}
