import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {Quiz} from '../screens/Quiz';
import {Welcome} from '../screens/Welcome';

export const MainNavigator = createAppContainer(
  createStackNavigator(
    {
      Welcome: Welcome,
      Quiz: Quiz,
    },
    {
      initialRouteName: 'Welcome',
    },
  ),
);
