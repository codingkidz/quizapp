import React, {useEffect, useState} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {
  Topic,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  Question,
} from '../../../utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useAppSelector} from '../../../ducks/store';
import {StackScreenProps} from '@react-navigation/stack';
import {UnitsStackParamList} from '../UnitsStack';
import {UnitsPage} from '../UnitsPage';

type Props = StackScreenProps<UnitsStackParamList, 'Topics'>;

const TopicsPage = (props: Props) => {
  const {route, navigation} = props;
  const {unit} = route.params;

  const TopicTile = (_props: {topic: Topic}) => {
    const {topic} = _props;
    return (
      <View style={styles.topicTileContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Quiz', {
              topic: topic,
            })
          }>
          <Text style={styles.topicTileText}>{topic.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.containerStyle}>
      {unit.topics?.map((topic) => {
        return <TopicTile topic={topic} key={topic.id} />;
      })}
    </View>
  );
};

export default TopicsPage;

const styles = {
  containerStyle: {
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: '#FF671D',
  },
  titleContainer: {
    height: hp('8%'),
    maxHeight: 70,
    width: wp('100%'),
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 15,
    color: 'black',
  },
  topicTileContainer: {
    borderWidth: 1.5,
    borderColor: 'black',
    borderRadius: 5,
    height: hp('15%'),
    maxHeight: 60,
    width: wp('35%'),
    maxWidth: 150,
    flexBasis: '40%',
    marginTop: hp('10%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicTileText: {
    fontSize: 20,
    color: 'black',
  },
};
