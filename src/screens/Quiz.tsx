import React from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {MultipleChoice} from '../components/MultipleChoice';
import {LivesContainer} from '../components/LivesContainer';
import {Question} from '../models/Question';
import {Button, Text} from 'react-native-elements';
import {useNavigation} from 'react-navigation-hooks';

export const Quiz: React.FC = () => {
  const [questions, setQuestions] = React.useState<Question[] | null>(null);
  const [currentQuestionIndex, setQuestionIndex] = React.useState<number>(0);
  const [lives, setLives] = React.useState<number>(3);
  const {navigate} = useNavigation();

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

  const handleResult = (result: boolean) => {
    result ? null : setLives(lives - 1);
    setQuestionIndex(currentQuestionIndex + 1)
  };

  const renderQuestion = () => {
    return questions && currentQuestionIndex < questions.length ? (
      <>
        <MultipleChoice
          key={questions[currentQuestionIndex].id}
          question={questions[currentQuestionIndex]}
          handleResult={handleResult}
        />
      </>
    ) : (
      <Text>You Passed the quiz</Text>
    );
  };

  const quizFailed = () => {
    return (
      <>
        <Text h2>You're out of lives</Text>
        <Button title="Restart Quiz" onPress={resetQuiz} />
        <Button
          title="Return to Unit List"
          onPress={() => {
            navigate('Welcome');
          }}
        />
      </>
    );
  };

  const resetQuiz = () => {
    setQuestionIndex(0);
    setLives(3);
  };

  // RENDER
  return lives >= 1 ? (
    <>
      <LivesContainer lives={lives} />
      {questions ? renderQuestion() : <Text>Loading Questions...</Text>}
    </>
  ) : (
    quizFailed()
  );
};

// styles
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  livesContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    alignSelf: 'center',
    paddingLeft: 10,
    paddingRight: 10,
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
