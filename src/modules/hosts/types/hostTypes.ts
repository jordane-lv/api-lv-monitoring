export const hostTypes = [
  'olt',
  'switch',
  'router',
  'wireless',
  'server',
  'pop',
] as const;

export type HostType = typeof hostTypes[number];
