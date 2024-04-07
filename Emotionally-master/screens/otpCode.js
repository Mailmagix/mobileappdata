import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';

const OtpCode = ({navigation}) => {
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const otpInputRefs = useRef([]);

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
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.heading}>Enter the 4 digit code</Text>
        <View style={styles.inlineFields}>
          {otpValues.map((value, index) => (
            <View
              style={[
                styles.inlineField,
                index === otpValues.length - 1 && {marginRight: 0},
              ]}
              key={index}>
              <TextInput
                style={styles.input}
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
          <TouchableOpacity style={styles.resendButton}>
            <Text style={styles.resendLink}>RESEND CODE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OtpCode;

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
    borderColor: '#000000',
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
});
