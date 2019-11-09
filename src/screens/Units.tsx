import * as React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from 'react-navigation-hooks';

export const Units: React.FC = () => {
  const [units, setUnits] = React.useState<string[] | null>(null);
  const {navigate} = useNavigation();

  const fetchUnits = async () => {
    await firestore()
      .collection('units')
      .doc('unit_1')
      .collection('questions')
      .get()
      .then(collectionSnapshot => {
        collectionSnapshot.forEach(ss => {
          
        });
      });
  };

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
