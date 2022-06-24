import { isIP } from 'net';

export default {
  validateHostName: (hostName: string): boolean => {
    const reHostName =
      /^\d{5}[\s_][A-Z]{3}(?:[\s_]?-[\s_]?[A-Z]{3})?[\s_]-[\s_][A-Z-_\s]+\b$/gm;

    return reHostName.test(hostName);
  },
  validateIpAddress: (ipAddress: string): boolean => {
    return isIP(ipAddress) !== 0;
  },
};
