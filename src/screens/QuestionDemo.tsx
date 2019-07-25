// components/Hello.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { MultipleChoice } from '../components/MultipleChoice';
import unit1 from '../questions/Unit 1/unit1.json';

interface Props {
  
}

interface State {
  
}

export class QuestionDemo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      
    };
  }

  render() {
    return (
      <MultipleChoice
        number = {unit1.questions.question_1.number}
        question = {unit1.questions.question_1.question}
        correct_answer = {unit1.questions.question_1.correct_answer}
        wrong_answers = {unit1.questions.question_1.wrong_answers}
      />
    ); 
  }
}

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
