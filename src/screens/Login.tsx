import * as React from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from 'react-navigation-hooks';
import auth from '@react-native-firebase/auth';

export const Login: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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
        autoCompleteType={'password'}
        secureTextEntry
        onChangeText={text => {
          setPassword(text);
        }}
        leftIcon={<Icon name="key" />}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} title={'Login'} onPress={handleLogin} />
        <Button
          style={styles.button}
          title={'Register'}
          onPress={() => {
            navigate('Register');
          }}
        />
        <Button
          style={styles.button}
          title={'Forgot Password?'}
          onPress={handlePasswordReset}
        />
      </View>
    </View>
  );

  // function handleLogin() {
  //   alert("LOGGIN ON");
  // }

  async function handleLogin() {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigate('Welcome'))
      .catch(e => {
        switch (e.code) {
          case 'auth/invalid-email':
            Alert.alert('Invalid Email');
            break;
          case 'auth/user-disabled':
            Alert.alert('This user has been disabled');
            break;
          case 'auth/user-not-found':
            Alert.alert('User not found');
            break;
          case 'auth/wrong-password':
            Alert.alert('Incorrect password');
            break;
          default:
            console.log(e);
        }
      });
  }

  async function handlePasswordReset() {
    if(email) {
      await auth()
      .sendPasswordResetEmail(email)
      .then(() => 'Password reset email has been sent!')
      .catch(e => {
        switch (e.code) {
          case 'auth/invalid-email':
            Alert.alert('Please Enter a Valid Email');
            break;
          default:
            Alert.alert(e);
            break;
        }
      });
    } else {
      Alert.alert('Enter your email, then click forgot password');
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
