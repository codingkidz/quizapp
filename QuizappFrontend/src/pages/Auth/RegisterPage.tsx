import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';

const RegisterPage = () => {
  enum Roles {
    Student = 'STUDENT',
    Teacher = 'TEACHER',
    Admin = 'ADMIN',
  }

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [role, setRole] = useState<Roles>();
  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Password must match!');
    } else {
      await axios
        .post('http://localhost:8000/api/auth/signup', {
          email: email,
          password: password,
          role: 'ADMIN',
        })
        .then(
          (response) => {
            setAccessToken(response.data.access_token);
            setRefreshToken(response.data.refresh_token);
          },
          (error) => {
            console.log('error occured', error);
            Alert.alert('Error!');
          },
        );
    }
  };

  return (
    <View style={styles.loginContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.titleText}> REGISTER </Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.textInput}
        />
        <DropDownPicker
          items={[
            {label: 'Student', value: 'STUDENT'},
            {label: 'Teacher', value: 'TEACHER'},
            {label: 'Admin', value: 'ADMIN'},
          ]}
          containerStyle={{height: 40, width: 200, marginLeft: wp('10%')}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          onChangeItem={(item) => setRole(item.value)}
          placeholder="Select A Role"
          dropDownStyle={{backgroundColor: '#fafafa'}}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.textInput}
        />
        <TextInput
          label="Re-enter Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          style={styles.textInput}
        />
        <Button mode="contained" style={styles.btn} onPress={handleSubmit}>
          SIGN UP
        </Button>
        <Text style={styles.forgot}> Existing User? Log In &#8594; </Text>
      </View>
      <Text style={styles.privacy}> Terms and Privacy Policy </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    height: hp('100%'),
    width: wp('100%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'white',
  },
  titleText: {
    alignSelf: 'flex-start',
    marginLeft: wp('10%'),
    color: '#FF671D',
    fontSize: 20,
    fontWeight: '700',
  },
  inputContainer: {
    height: hp('40%'),
    width: wp('100%'),
    marginTop: hp('-20%'),
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  textInput: {
    width: wp('80%'),
    height: hp('5.8%'),
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FF671D',
    marginLeft: wp('10%'),
  },
  role: {},
  btn: {
    height: 50,
    width: 150,
    backgroundColor: '#FF671D',
    marginLeft: wp('10%'),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    fontSize: 15,
  },
  forgot: {
    color: '#FF671D',
    fontSize: 15,
    marginLeft: wp('10%'),
  },
  privacy: {
    position: 'absolute',
    bottom: hp('15%'),
    color: '#1B6A7A',
    fontSize: 14,
  },
});

export default RegisterPage;