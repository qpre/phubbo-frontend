let config = {
  apiEndpoint: 'http://phubo-api.herokuapp.com',
};

if (__DEV__) {
  config = {
    apiEndpoint: 'http://localhost:4080',
  };
}

export default config;
