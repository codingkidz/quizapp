import * as React from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {ButtonGroup, Text} from 'react-native-elements';
import {Question} from '../models/Question';

interface Props {
  question: Question;
}

export const MultipleChoice: React.FC<Props> = props => {
  const question: Question = props.question;
  const answers = shuffle(
    question.wrong_answers.concat(question.correct_answer)
  );

  return (
    <View>
      <Text h4>Question {question.number}</Text>

      {/* display question */}
      <Text h3>{question.question}</Text>

      {/* diplay answer buttons */}
      <View>
        <ButtonGroup onPress={checkAnswer} buttons={answers} />
      </View>
    </View>
  );

  function checkAnswer(answer: number) {
    if (answers[answer] === question.correct_answer) {
      Alert.alert(answers[answer] + ' is Correct');
    } else {
      Alert.alert(answers[answer] + ' is Incorrect');
    }
  }

  function shuffle(array: any[]) {
    var i = 0,
      j = 0,
      temp = null;

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }
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
