import {
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {fetchOtp} from '../store/actions/signUpOtpActions';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const SignUpOtpCode = ({navigation, route, fetchOtp, validationError}) => {
  const {userId, email} = route.params;
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const otpInputRefs = useRef([]);

  // State for countdown timer
  const [countdown, setCountdown] = useState(60); // 30 seconds initially
  const [isResendButtonDisabled, setIsResendButtonDisabled] = useState(false);
  const [showResendText, setShowResendText] = useState(false);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      if (value !== '') {
        // Move to the next input field if available
        if (index < otpInputRefs.current.length - 1) {
          otpInputRefs.current[index + 1].focus();
        }
      } else {
        // Clear the input field and move to the previous input field
        if (index > 0) {
          otpInputRefs.current[index - 1].focus();
        }
      }

      // Check if this is the last digit field
      if (index === 3) {
        const enteredOtp = newOtpValues.join('');
        fetchOtp(userId, email, navigation, enteredOtp);
      }
    }
  };

  // State to control whether the modal is visible or not
  const [isModalVisible, setModalVisible] = useState(true);

  // Hide the modal after 5 seconds
  useEffect(() => {
    setTimeout(() => {
      setModalVisible(false);
    }, 5000);
  }, []);

  useEffect(() => {
    // Function to start the countdown
    const startCountdown = () => {
      setCountdown(60); // Reset the countdown to 30 seconds
      setIsResendButtonDisabled(true); // Disable the resend button
      setShowResendText(false); // Hide "Please check your email" text
      const intervalId = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown > 0) {
            return prevCountdown - 1;
          } else {
            clearInterval(intervalId);
            setIsResendButtonDisabled(false); // Enable the resend button
            return 0;
          }
        });
      }, 1000);
    };

    // Check if the timer should be started
    if (countdown > 0) {
      startCountdown();
    }
  }, []); // Removed [countdown] dependency to start the countdown only once

  // Function to convert seconds to mm:ss format
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <CheckIcon name="check-circle" size={48} color="black" />
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: '700',
                marginTop: 5,
              }}>
              OTP Sent
            </Text>
            <Text style={{color: 'black', fontSize: 13, marginTop: 5}}>
              Please check your Email
            </Text>
          </View>
        </View>
      </Modal>
      <View style={styles.box}>
        <Text style={styles.heading}>Enter the 4 digit code</Text>
        {validationError && (
          <Text style={styles.errorText}>{validationError}</Text>
        )}
        {showResendText && (
          <Text style={styles.emailText}>Please check your email</Text>
        )}
        <View style={styles.inlineFields}>
          {otpValues.map((value, index) => (
            <View
              style={[
                styles.inlineField,
                index === otpValues.length - 1 && {marginRight: 0},
                {borderColor: validationError ? 'red' : '#000000'},
              ]}
              key={index}>
              <TextInput
                style={[styles.input, validationError && styles.inputWithError]}
                value={value}
                onChangeText={text => handleOtpChange(index, text)}
                keyboardType="numeric"
                maxLength={1}
                ref={ref => (otpInputRefs.current[index] = ref)}
              />
            </View>
          ))}
        </View>
        <View style={styles.submit}>
          <Text style={styles.bottomLink}> Did not receive code?</Text>
          <TouchableOpacity
            style={styles.resendButton}
            onPress={() => {
              setShowResendText(true);
            }}
            disabled={isResendButtonDisabled}>
            <Text
              style={[
                styles.resendLink,
                isResendButtonDisabled ? styles.disabledResendText : null,
              ]}>
              RESEND CODE
            </Text>
          </TouchableOpacity>

          {isResendButtonDisabled && (
            <Text style={styles.countdownText}>{formatTime(countdown)}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  validationError: state.otpAuth.validationError,
});

const mapDispatchToProps = {
  fetchOtp,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpOtpCode);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  box: {
    justifyContent: 'center',
    padding: 25,
    position: 'fixed',
    top: 180,
  },
  heading: {
    color: 'black',
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 30,
    marginTop: 50,
    textAlign: 'center',
  },
  inlineFields: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inlineField: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
  },
  submit: {
    marginTop: 5,
  },
  bottomLink: {
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
  },
  resendLink: {
    color: '#000000',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },
  disabledResendText: {
    color: 'grey', // Change the text color to grey when disabled
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // This will create a semi-transparent background
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: 250,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  emailText: {
    color: 'blue', // Set the text color to blue
    fontSize: 16, // Adjust the font size as needed
    textAlign: 'center', // Center the text
    marginBottom: 10, // Add some top margin
  },
  countdownText: {
    color: 'red', // Set the text color to red
    fontSize: 16, // Adjust the font size as needed
    textAlign: 'center', // Center the text
    marginTop: 10, // Add some top margin
  },
});
