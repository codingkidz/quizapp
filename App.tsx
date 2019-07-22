import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { MainNavigator } from './src/navigation/MainNavigator';

export default class App extends React.Component {
  render() {
    return <MainNavigator />;
  }
}
