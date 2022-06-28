interface IHostNameFormatData {
  code: string;
  name: string;
  groupName: string;
}

interface IMapNameFormatData {
  code: string;
  mapName: string;
  groupName: string;
}

export default {
  getHostNameFormat: ({ code, name, groupName }: IHostNameFormatData) => {
    const correctCode = code.toUpperCase().trim();
    const correctName = name.toUpperCase().trim();
    const correctGroupName = groupName.toUpperCase().trim();

    return `${correctCode} ${correctGroupName} - ${correctName}`;
  },
  getMapNameFormat: ({ code, groupName, mapName }: IMapNameFormatData) => {
    const correctCode = code.toUpperCase().trim();
    const correctGroupName = groupName.toUpperCase().trim();
    const correctMapName = mapName.toUpperCase().trim();

    return `${correctCode} - ${correctGroupName} | ${correctMapName}`;
  },
};
