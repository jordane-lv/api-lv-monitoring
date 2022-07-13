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
  customCssUrl: '/monitoramento/css/custom.css',
  customfavIcon: '/monitoramento/favicon.ico',
  customSiteTitle: 'API LV Monitoring',
};
