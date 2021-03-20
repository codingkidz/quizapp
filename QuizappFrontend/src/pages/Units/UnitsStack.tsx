import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {UnitsPage} from './UnitsPage';
import {LessonsPage} from './Lessons/LessonsPage';

const Stack = createStackNavigator();

const UnitsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Units">
      <Stack.Screen
        name="Units"
        component={UnitsPage}
        options={{
          title: '',
          headerLeft: null as any,
          headerStyle: {
            backgroundColor: '#FFF9DF',
          },
        }}
      />
      <Stack.Screen
        name="Lessons"
        component={LessonsPage}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#FFF9DF',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default UnitsStack;
