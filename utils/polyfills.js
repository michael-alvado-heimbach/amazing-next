/* eslint no-extend-native: 0 */
import includes from 'core-js/library/fn/string/virtual/includes';
import repeat from 'core-js/library/fn/string/virtual/repeat';
import assign from 'core-js/library/fn/object/assign';
import { isNodeEnvDevelopment } from './nodeFunctions';

if (isNodeEnvDevelopment()) {
  console.log('Polyfills loaded');
}

String.prototype.includes = includes;
String.prototype.repeat = repeat;
Object.assign = assign;
