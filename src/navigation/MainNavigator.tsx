import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {Quiz} from '../screens/Quiz';
import {Welcome} from '../screens/Welcome';
import {Login} from '../screens/Login';
import {Register} from '../screens/Register';
import {AuthLoading} from '../screens/AuthLoading';
import {Units} from '../screens/Units';

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        title: 'Login'
      }
    },
    Register: {
      screen: Register,
      navigationOptions: {
        title: 'Register',
        headerLeft: null
      }
    }
  },
  {
    initialRouteName: 'Login'
  }
);

const AppStack = createStackNavigator({
  Welcome: {
    screen: Welcome
  },
  Units: {
    screen: Units
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerLeft: null
    }
  }
});

export const MainNavigator = createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoading,
    Auth: AuthStack,
    App: AppStack
  })
);
