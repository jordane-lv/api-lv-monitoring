const DisableTryItOutPlugin = () => {
  return {
    statePlugins: {
      spec: {
        wrapSelectors: {
          allowTryItOutFor: () => () => false,
        },
      },
    },
  };
};

export const swaggerOptions = {
  swaggerOptions: {
    plugins: [DisableTryItOutPlugin],
  },
};
