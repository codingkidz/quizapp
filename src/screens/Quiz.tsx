import React from 'react';
import {StyleSheet, Text, SafeAreaView, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {MultipleChoice} from '../components/MultipleChoice';
import {Question} from '../models/Question';

export const Quiz: React.FC = () => {
  const [questions, setQuestions] = React.useState<Question[] | null>(null);

  React.useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    let question: Question;
    let tempQuestions: Question[] = [];
    await firestore()
      .collection('units')
      .doc('unit_1')
      .collection('questions')
      .get()
      .then(collectionSnapshot => {
        collectionSnapshot.forEach(ss => {
          question = ss.data() as Question;
          question.id = ss.id;
          tempQuestions.push(question);
        });
      });

    setQuestions(tempQuestions);
  };

  const renderQuestions = () => {
    if (questions) {
      console.log('rendering questions...');
      return questions.map(question => {
        return <MultipleChoice key={question.id} question={question} />;
      });
    } else {
      console.log('retrying render...');
      setTimeout(renderQuestions(), 1000);
    }
  };

  return (
    <>
      {questions ? (
        <SafeAreaView>
          <ScrollView>
            {renderQuestions()}
          </ScrollView>
        </SafeAreaView>
      ) : (
        <Text>Loading Questions...</Text>
      )}
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
