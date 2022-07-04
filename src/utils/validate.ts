import { isIP } from 'net';

const patterns = {
  code: '\\d{5}',
  initials: '[A-Z]{3}(?:\\s?-\\s?[A-Z]{3})?',
  name: '[A-Z0-9\\s-]+',
};

export default {
  validIpAddress: (ipAddress: string): boolean => {
    return isIP(ipAddress) !== 0;
  },
  validateCode: (code: string): boolean => {
    const re = new RegExp(`^${patterns.code}$`, 'gm');
    return re.test(code);
  },
  validateInitial: (initial: string): boolean => {
    const re = new RegExp(`^${patterns.initials}$`, 'gm');
    return re.test(initial);
  },
  validHostName: (hostName: string): boolean => {
    const re = new RegExp(`^${patterns.name}$`, 'gm');
    return re.test(hostName);
  },
};
