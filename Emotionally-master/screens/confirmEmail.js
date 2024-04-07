import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const ConfirmEmail = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.heading}>Confirm email address</Text>
        <View style={styles.inputContainer}>
          <EmailIcon name="email" style={styles.emailicon} />
          <TextInput
            style={styles.input}
            placeholder="amit@emotionally.com"
            placeholderTextColor="black"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.submit}>
          <TouchableOpacity
            style={styles.resendButton}
            onPress={() => navigation.navigate('OtpCode')}>
            <Text style={styles.buttonText}>RESEND</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ConfirmEmail;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#9ca19d',
    paddingHorizontal: 20,
    fontFamily: 'ProximaNova-Regular',
  },
  box: {
    justifyContent: 'center',
    padding: 25,
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'fixed',
    top: 230,
  },
  heading: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 10,
    marginTop: 20,
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
  resendButton: {
    paddingVertical: 12,
    marginVertical: 6,
    backgroundColor: '#000000',
    paddingHorizontal: 15,
    borderRadius: 30,
  },
  submit: {
    marginTop: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
});
