let config = {
  apiEndpoint: 'http://phubo-api.herokuapp.com',
  facebook: {
    appId: '333327010124581',
  },
};

/*eslint-disable */
if (__DEV__) {
  config = {
    apiEndpoint: 'http://localhost:4080',
    facebook: {
      appId: '293516484105634',
    },
  };
}
/*eslint-enable */

export default config;
