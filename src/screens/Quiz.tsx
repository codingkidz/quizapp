import React from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {MultipleChoice} from '../components/MultipleChoice';
import {LivesContainer} from '../components/LivesContainer';
import {Question} from '../models/Question';
import {Button, Text} from 'react-native-elements';

export const Quiz: React.FC = () => {
  const [questions, setQuestions] = React.useState<Question[] | null>(null);
  const [currentQuestionIndex, setQuestionIndex] = React.useState<number>(0);
  const [lives, setLives] = React.useState<number>(3);
  // let lives = 3;

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

  // const renderQuestions = () => {
  //   if (questions) {
  //     console.log('rendering questions...');
  //     return questions.map(question => {
  //       return <MultipleChoice key={question.id} question={question} />;
  //     });
  //   } else {
  //     console.log('retrying render...');
  //     setTimeout(renderQuestions(), 1000);
  //   }
  // };

  const handleResult = (result: boolean) => {
    result ? null: setLives(lives-1)
    // result ? null : lives--;
  };

  const renderQuestion = () => {
    if (questions) {
      return (
        <>
          <MultipleChoice
            key={questions[currentQuestionIndex].id}
            question={questions[currentQuestionIndex]}
            handleResult={handleResult}
          />
        </>
      );
    } else {
      return <Text>Loading Questions...</Text>;
    }
  };
  
  return (
    <>
      <LivesContainer lives={lives} />
      {renderQuestion()}
    </>
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
