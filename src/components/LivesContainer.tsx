import React from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  lives: number;
}

export const LivesContainer: React.FC<Props> = props => {
  // const [lives, setLives] = React.useState(props.lives);
  let lives = props.lives;

  return (
    <View style={styles.livesContainer}>
      {lives >= 1 ? (
        <Icon name="heart" size={50} />
      ) : (
        <Icon name="heart-o" size={50} />
      )}
      {lives >= 2 ? (
        <Icon name="heart" size={50} />
      ) : (
        <Icon name="heart-o" size={50} />
      )}
      {lives === 3 ? (
        <Icon name="heart" size={50} />
      ) : (
        <Icon name="heart-o" size={50} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  livesContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    alignSelf: 'center',
    marginHorizontal: 20,
    marginVertical: 20
  }
});
