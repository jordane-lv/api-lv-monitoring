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
  customCssUrl: '/css/custom.css',
  customfavIcon: '/favicon.ico',
  customSiteTitle: 'API LV Monitoring',
};
