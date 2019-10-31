import * as React from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from 'react-navigation-hooks';
import auth from '@react-native-firebase/auth';

export const Register: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const {navigate} = useNavigation();

  return (
    <View>
      <Input
        placeholder={'Email'}
        autoCompleteType={'email'}
        keyboardType={'email-address'}
        onChangeText={text => {
          setEmail(text);
        }}
        leftIcon={<Icon name="email" />}
      />
      <Input
        placeholder={'Password'}
        // autoCompleteType={'password'}
        secureTextEntry
        onChangeText={text => {
          setPassword(text);
        }}
        leftIcon={<Icon name="key" />}
      />
      <Input
        placeholder={'Confirm Password'}
        // autoCompleteType={'password'}
        secureTextEntry
        onChangeText={text => {
          setConfirmPassword(text);
        }}
        leftIcon={<Icon name="key" />}
      />
      <View style={styles.buttons}>
        <Button title={'Register'} onPress={handleRegister} />
        <Button
          style={styles.button}
          title={'Back to Login'}
          onPress={() => {
            navigate('Login');
          }}
        />
      </View>
    </View>
  );

  async function handleRegister() {
    if (password === confirmPassword) {
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => navigate('Login'))
        .catch(e => {
          switch (e.code) {
            case 'auth/email-already-in-use':
              Alert.alert('Email Already In Use');
              break;
            case 'auth/invalid-email':
              Alert.alert('Please Enter a Valid Email');
              break;
            case 'auth/weak-password':
              Alert.alert('Use a Stronger Password');
              break;
            default:
              console.log(e);
          }
        });
    }
  }
};

// styles
const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    alignSelf: 'center'
  },
  buttons: {
    flexDirection: 'column',
    minHeight: 70,
    alignItems: 'stretch',
    alignSelf: 'center',
    padding: 10
  },
  button: {
    // flex: 2,
    padding: 10
  },
  greeting: {
    color: '#999',
    fontWeight: 'bold'
  }
});
