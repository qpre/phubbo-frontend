let config = {
  apiEndpoint: 'http://phubo-api.herokuapp.com',
};

/*eslint-disable */
if (__DEV__) {
  config = {
    apiEndpoint: 'http://localhost:4080',
  };
}
/*eslint-enable */

export default config;
