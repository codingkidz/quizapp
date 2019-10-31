import * as React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {useNavigation} from 'react-navigation-hooks';

export const Welcome: React.FC = () => {
  const {navigate} = useNavigation();

  return (
    <View>
      <Text>Welcome!</Text>
      <Button title="Begin Questions!" onPress={() => navigate('Quiz')} />
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    alignSelf: 'center'
  },
  buttons: {
    flexDirection: 'row',
    minHeight: 70,
    alignItems: 'stretch',
    alignSelf: 'center',
    borderWidth: 5
  },
  button: {
    flex: 1,
    paddingVertical: 0
  },
  greeting: {
    color: '#999',
    fontWeight: 'bold'
  }
});
