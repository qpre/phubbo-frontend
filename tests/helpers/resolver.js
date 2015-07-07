import Resolver from 'ember/resolver';
import config from '../../config/environment';

let resolver = Resolver.create();
let modulePrefix = config.modulePrefix;
let podModulePrefix = config.podModulePrefix;

resolver.namespace = {
  modulePrefix,
  podModulePrefix
};


export default resolver;
