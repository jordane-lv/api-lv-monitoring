interface IRequest {
  code: string;
  name: string;
  groupName: string;
}

export default {
  getHostNameFormat: ({ code, name, groupName }: IRequest) => {
    const correctCode = code.toUpperCase().trim();
    const correctName = name.toUpperCase().trim();
    const correctGroupName = groupName.toUpperCase().trim();

    return `${correctCode} ${correctGroupName} - ${correctName}`;
  },
};
