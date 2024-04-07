/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppWithRedux from './store/index';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppWithRedux);
