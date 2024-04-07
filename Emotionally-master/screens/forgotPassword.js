import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import HeaderIcon from 'react-native-vector-icons/Feather';
import ForgotPasswordIcon from 'react-native-vector-icons/Fontisto';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const ForgotPassword = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.backicon}>
            <HeaderIcon name="arrow-left-circle" size={40} />
            &nbsp;&nbsp;
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.iconContainer}>
          <ForgotPasswordIcon name="locked" style={styles.forgotPasswordIcon} />
          &nbsp;&nbsp;
        </Text>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subTitle}>
          Enter your registered email below to receive password reset
          instructions
        </Text>
        <View style={styles.inputContainer}>
          <EmailIcon name="email" style={styles.emailicon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="black"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.submit}>
          <TouchableOpacity
            style={styles.signinButton}
            onPress={() => navigation.navigate('ConfirmEmail')}>
            <Text style={styles.buttonText}>SEND</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    height: '100%',
    fontFamily: 'ProximaNova-Regular',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'left',
    padding: 20,
  },
  backicon: {
    color: '#000000',
    fontWeight: '600',
    marginBottom: 18,
  },
  bodyContainer: {
    justifyContent: 'center',
    padding: 30,
  },
  iconContainer: {
    textAlign: 'center',
  },
  forgotPasswordIcon: {
    fontSize: 100,
    color: '#000000',
  },
  title: {
    color: 'black',
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 20,
    marginTop: 50,
    textAlign: 'center',
  },
  subTitle: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 10,
    marginTop: 30,
  },
  emailicon: {
    fontSize: 18,
    marginRight: 10,
    color: '#000000',
  },
  input: {
    flex: 1,
    color: '#000000',
  },
  signinButton: {
    paddingVertical: 12,
    marginVertical: 6,
    backgroundColor: '#000000',
    paddingHorizontal: 12,
    borderRadius: 30,
  },
  submit: {
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
});
