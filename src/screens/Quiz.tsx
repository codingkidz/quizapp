import React from 'react';
import {StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {MultipleChoice} from '../components/MultipleChoice';
import unit1 from '../questions/Unit 1/unit1.json';
import {Question} from '../models/Question';

export const Quiz: React.FC = () => {
  const jsonQuestion = unit1.questions.question_1;
  const [demoQuestion, setQuestion] = React.useState<Question | null>(null);

  React.useEffect(() => {
    fetchQuestion();
  },[])
  
  const fetchQuestion = async () => {
    await firestore()
    .collection('units')
    .doc('unit_1')
    .collection('questions')
    .doc('0pnPNyNWNfEDabARzC7C')
    .get()
    .then(snapshot => {
      setQuestion(snapshot.data() as Question);
    }).catch(error => {
      console.log(error)
    });
  }

  return (
    <>
      <MultipleChoice question={jsonQuestion} />
      {demoQuestion ? <MultipleChoice question={demoQuestion} /> : null}
    </>
  );
};

// styles
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttons: {
    flexDirection: 'row',
    minHeight: 70,
    alignItems: 'stretch',
    alignSelf: 'center',
    borderWidth: 5,
  },
  button: {
    flex: 1,
    paddingVertical: 0,
  },
  greeting: {
    color: '#999',
    fontWeight: 'bold',
  },
});
