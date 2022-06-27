import { isIP } from 'net';

export default {
  validateHostName: (hostName: string): boolean => {
    const reCode = '\\d{5}';
    const reInitials = '[A-Z]{3}(?:\\s?-\\s?[A-Z]{3})?';
    const reName = '[A-Z0-9\\s-]+';

    const reHostName = new RegExp(
      `^${reCode}\\s${reInitials}\\s-\\s${reName}$`,
      'gm',
    );

    return reHostName.test(hostName);
  },
  validateIpAddress: (ipAddress: string): boolean => {
    return isIP(ipAddress) !== 0;
  },
};
