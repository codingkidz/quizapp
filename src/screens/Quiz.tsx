import React from 'react';
import {StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {MultipleChoice} from '../components/MultipleChoice';
import unit1 from '../questions/Unit 1/unit1.json';

export const Quiz: React.FC = () => {
  const jsonQuestion = unit1.questions.question_1;
  return <MultipleChoice question={jsonQuestion} />;
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
