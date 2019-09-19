import React from 'react';
import {Button, StyleSheet, Text, View, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export class MultipleChoice extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      number: this.props.number,
      question: this.props.question,
      answers: this.props.wrong_answers.concat(this.props.correct_answer)
    }

    this.shuffle(this.state.answers)
  }

  render() {
    return (
      <View>
        <Text>
            Question {this.props.number}
        </Text>

          {/* display question */}
        <Text>{this.props.question}</Text>

        {/* diplay answer buttons */}
        <View>
          {this.displayButtons()}
        </View>
      </View>
    );
  }

  displayButtons() {
    return this.state.answers.map((answer) => {
      return (
        <Button
          key = {answer}
          title = {answer}
          onPress = {this.checkAnswer.bind(this, answer)}
        />
      );
    });
  }

  checkAnswer(answer) {
    if(answer === this.props.correct_answer) {
      Alert.alert("Correct")
    } else {
      Alert.alert("Incorrect")
    }
  }

  shuffle (array) {
    var i = 0
      , j = 0
      , temp = null
  
    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }

    return array
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
