import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import { QuestionDemo } from "../screens/QuestionDemo";

export const MainNavigator = createAppContainer(createStackNavigator(
  {
    QuestionDemo: QuestionDemo
  },
  {
    initialRouteName: "QuestionDemo"
  }
));
