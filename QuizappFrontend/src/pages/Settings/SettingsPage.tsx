import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Alert} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import {useAppDispatch} from '../../ducks/store';
import {logout} from '../Auth/authSlice';
import {Button} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    dispatch(logout());
  };

  const goToProfilePage = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcomeWrap}>
        <Text style={[styles.welcomeText, styles.bold]}>
          {' '}
          Settings will be here{' '}
        </Text>
      </View>
      <Button onPress={goToProfilePage}>Go to Profile</Button>
      <Button onPress={handleLogout}>Logout</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: '#FF671D',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  welcomeWrap: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 20,
    color: 'black',
  },
  languageWrap: {
    height: hp('15%'),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  languagePrompt: {
    fontSize: 20,
    color: 'black',
    paddingLeft: 2,
  },
});

export default SettingsPage;
