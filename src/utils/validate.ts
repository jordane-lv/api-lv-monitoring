import { isIP } from 'net';

const reCode = '\\d{5}';
const reInitials = '[A-Z]{3}(?:\\s?-\\s?[A-Z]{3})?';
const reName = '[A-Z0-9\\s-]+';

export default {
  validHostName: (hostName: string): boolean => {
    const reHostName = new RegExp(
      `^${reCode}\\s${reInitials}\\s-\\s${reName}$`,
      'gm',
    );

    return reHostName.test(hostName);
  },
  validIpAddress: (ipAddress: string): boolean => {
    return isIP(ipAddress) !== 0;
  },
};
