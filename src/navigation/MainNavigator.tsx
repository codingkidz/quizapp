import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import { QuestionDemo } from "../screens/QuestionDemo";
import { Welcome } from '../screens/Welcome';

export const MainNavigator = createAppContainer(createStackNavigator(
  {
    Welcome: Welcome,
    QuestionDemo: QuestionDemo
  },
  {
    initialRouteName: "Welcome"
  }
));
