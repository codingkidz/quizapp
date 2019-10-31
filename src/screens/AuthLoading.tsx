import React from 'react';
import {ActivityIndicator, StatusBar, View} from 'react-native';

import auth from '@react-native-firebase/auth';
import {useNavigation} from 'react-navigation-hooks';

export const AuthLoading: React.FC = () => {
  const {navigate} = useNavigation();

  React.useEffect(() => {
    _bootstrapAsync();
  });

  // Fetch the token from storage then navigate to our appropriate place
  const _bootstrapAsync = async () => {
    const userToken = await auth().currentUser;

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};
