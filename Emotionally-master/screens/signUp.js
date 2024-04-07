import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import UserIcon from 'react-native-vector-icons/FontAwesome';
import PasswordIcon from 'react-native-vector-icons/MaterialIcons';
import EyeIcon from 'react-native-vector-icons/Entypo';
import HeaderIcon from 'react-native-vector-icons/Feather';
import AgeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import GenderIcon from 'react-native-vector-icons/FontAwesome';
import RelationIcon from 'react-native-vector-icons/FontAwesome';
import CountryIcon from 'react-native-vector-icons/Entypo';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PhoneIcon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {addUser, clearError} from '../store/actions/userActions';
import {userApiServer} from '../config';
import {useFocusEffect} from '@react-navigation/native';

const SignUp = ({navigation, addUser, error, clearError}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessages, setErrorMessages] = useState([]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handlePickerPress = () => {
    // Open the picker items
    this.pickerRef.focus();
  };

  const handlePickerPress1 = () => {
    // Open the picker items
    this.pickerRef1.focus();
  };

  const [countries, setCountries] = useState([]);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(`${userApiServer}/countries/`);
      setCountries(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handlePickerPress2 = () => {
    // Open the picker items
    this.pickerRef2.focus();
  };

  const [name, setName] = useState('');
  const [nameTouched, setNameTouched] = useState(false);
  const [showNameError, setShowNameError] = useState(false);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [relationship, setRelationship] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [showPhoneError, setShowPhoneError] = useState(false);

  const handleNameChange = value => {
    setName(value);
    setNameTouched(true);
  };

  const handleEmailChange = value => {
    setEmail(value);
    setEmailTouched(true);
  };

  const handlePasswordChange = value => {
    setPassword(value);
    setPasswordTouched(true);
  };

  const handlePhoneChange = value => {
    setPhone(value);
    setPhoneTouched(true);
  };

  const validateName = () => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (nameTouched) {
      if (name.trim() === '') {
        setShowNameError(true);
      } else if (!nameRegex.test(name)) {
        setShowNameError(true);
      } else {
        setShowNameError(false);
      }
    } else {
      setShowNameError(false);
    }
  };

  const hideNamePopup = () => {
    setShowNameError(false);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailTouched) {
      if (email.trim() === '') {
        setShowEmailError(true);
      } else if (!emailRegex.test(email)) {
        setShowEmailError(true);
      } else {
        setShowEmailError(false);
      }
    } else {
      setShowEmailError(false);
    }
  };

  const hideEmailPopup = () => {
    setShowEmailError(false);
  };

  const validatePassword = () => {
    // Password validation criteria
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (passwordTouched) {
      if (password.trim() === '') {
        setShowPasswordError(true);
      } else if (!passwordRegex.test(password)) {
        setShowPasswordError(true);
      } else {
        setShowPasswordError(false);
      }
    } else {
      setShowPasswordError(false);
    }
  };

  const hidePasswordPopup = () => {
    setShowPasswordError(false);
  };

  const validatePhone = () => {
    const phoneRegex = /^\d{10}$/;
    if (phoneTouched) {
      if (phone.trim() === '') {
        setShowPhoneError(true);
      } else if (!phoneRegex.test(phone)) {
        setShowPhoneError(true);
      } else {
        setShowPhoneError(false);
      }
    } else {
      setShowPhoneError(false);
    }
  };

  const hidePhonePopup = () => {
    setShowPhoneError(false);
  };

  const handleSignup = () => {
    const validationErrors = [];

    // Validate each field and push error messages to the array
    if (name.trim() === '') {
      validationErrors.push('Name is required');
    }
    if (email.trim() === '') {
      validationErrors.push('Email is required');
    }
    if (password.trim() === '') {
      validationErrors.push('Password is required');
    }
    if (phone.trim() === '') {
      validationErrors.push('Phone is required');
    }

    // If there are validation errors, update the errorMessages state
    if (validationErrors.length > 0) {
      setErrorMessages(validationErrors);
      return;
    }

    console.log('handleSignup called');
    // setLoading(true);
    const user = {
      name,
      age,
      gender,
      relationshipStatus: relationship,
      country,
      email,
      password,
      mobileNumber: phone,
    };
    addUser(user, navigation);
    console.log('Navigation will be performed now');
    setName('');
    setAge('');
    setGender('');
    setRelationship('');
    setCountry('');
    setEmail('');
    setPassword('');
    setPhone('');
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => clearError();
    }, []),
  );

  return loading ? (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}>
      {/* <Text style={{fontSize: 32, fontWeight: '700'}}>LOADING...</Text> */}
      <ActivityIndicator size={70} color="black" />
    </View>
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.backicon}>
            <HeaderIcon name="arrow-left-circle" size={40} />
            &nbsp;&nbsp;
          </Text>
        </TouchableOpacity>
        <Text style={styles.title}>Create your account</Text>
        <Text style={{fontSize: 15, color: 'black'}}>
          Register For Free 7 Day Trial
        </Text>
      </View>
      {showNameError && (
        <TouchableWithoutFeedback onPress={hideNamePopup}>
          <View style={styles.popup}>
            <Text style={styles.popupText}>Invalid name format</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
      {showEmailError && (
        <TouchableWithoutFeedback onPress={hideEmailPopup}>
          <View style={styles.popup}>
            <Text style={styles.popupText}>Invalid email format</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
      {showPasswordError && (
        <TouchableWithoutFeedback onPress={hidePasswordPopup}>
          <View style={styles.popup}>
            <Text style={styles.popupText}>
              Password should be at least 8 characters long, one uppercase
              letter and one special character.
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )}
      {showPhoneError && (
        <TouchableWithoutFeedback onPress={hidePhonePopup}>
          <View style={styles.popup}>
            <Text style={styles.popupText}>Invalid phone number format</Text>
          </View>
        </TouchableWithoutFeedback>
      )}
      {error && <Text style={styles.error}>{error}</Text>}
      {errorMessages.map((errorMessage, index) => (
        <View style={styles.popup} key={index}>
          <Text style={styles.popupText}>{errorMessage}</Text>
        </View>
      ))}
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <UserIcon name="user" style={styles.usericon} />
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="black"
            value={name}
            onChangeText={text => handleNameChange(text)}
            onBlur={validateName}
          />
        </View>
        <View style={styles.inlineFields}>
          <View style={styles.inlineField1}>
            <AgeIcon name="human-queue" style={styles.ageicon} />
            <TextInput
              style={styles.input}
              placeholder="Age"
              placeholderTextColor="black"
              value={age}
              onChangeText={text => setAge(text)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inlineField2}>
            <TouchableOpacity
              onPress={handlePickerPress}
              style={styles.pickerField}>
              <GenderIcon name="venus-mars" style={styles.gendericon} />
              <Picker
                ref={ref => (this.pickerRef = ref)}
                selectedValue={gender}
                onValueChange={(val, ind) => setGender(val)}
                style={styles.input}
                value={gender}>
                <Picker.Item
                  label="Gender"
                  value={null}
                  style={styles.inlineInput}
                />
                <Picker.Item
                  label="Female"
                  value="Female"
                  style={styles.inlineInput}
                />
                <Picker.Item
                  label="Male"
                  value="Male"
                  style={styles.inlineInput}
                />
              </Picker>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inlineFields}>
          <View style={styles.inlineField1}>
            <TouchableOpacity
              onPress={handlePickerPress1}
              style={styles.pickerField}>
              <RelationIcon name="heart" style={styles.relationicon} />
              <Picker
                ref={ref => (this.pickerRef1 = ref)}
                selectedValue={relationship}
                onValueChange={(val, ind) => setRelationship(val)}
                style={styles.input}
                value={relationship}>
                <Picker.Item
                  label="Relationship"
                  value={null}
                  style={styles.inlineInput}
                />
                <Picker.Item
                  label="Married"
                  value="Married"
                  style={styles.inlineInput}
                />
                <Picker.Item
                  label="Single"
                  value="Single"
                  style={styles.inlineInput}
                />
              </Picker>
            </TouchableOpacity>
          </View>
          <View style={styles.inlineField2}>
            <TouchableOpacity
              onPress={handlePickerPress2}
              style={styles.pickerField}>
              <CountryIcon name="location-pin" style={styles.Countryicon} />
              <Picker
                ref={ref => (this.pickerRef2 = ref)}
                selectedValue={country}
                onValueChange={(val, ind) => setCountry(val)}
                style={styles.input}
                value={country}>
                <Picker.Item label="Country" value={null} />
                {countries.map((country, index) => (
                  <Picker.Item
                    key={index}
                    label={country.name}
                    value={country}
                    style={styles.inlineInput}
                  />
                ))}
              </Picker>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <EmailIcon name="email" style={styles.emailicon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="black"
            keyboardType="email-address"
            value={email}
            onChangeText={text => handleEmailChange(text)}
            onBlur={validateEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <PasswordIcon name="privacy-tip" style={styles.passwordicon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            placeholderTextColor="black"
            value={password}
            onChangeText={text => handlePasswordChange(text)}
            onBlur={validatePassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <EyeIcon
              name={isPasswordVisible ? 'eye-with-line' : 'eye'}
              style={styles.eyeicon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <PhoneIcon name="phone-alt" style={styles.phoneicon} />
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            placeholderTextColor="black"
            value={phone}
            keyboardType="numeric"
            onChangeText={text => handlePhoneChange(text)}
            onBlur={validatePhone}
          />
        </View>
        <View style={styles.submit}>
          <TouchableOpacity style={styles.signinButton} onPress={handleSignup}>
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.bottomLink}>
              Already have an account?
              <Text style={styles.signupLink}> SIGN IN</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
    error: state.user.error,
  };
};

const mapDispatchToProps = {
  addUser: addUser,
  clearError,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    flexGrow: 1,
    fontFamily: 'ProximaNova-Regular',
  },
  popup: {
    alignItems: 'left',
    marginHorizontal: 15,
    backgroundColor: '#f5bcc0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
  },
  popupText: {
    color: 'red',
    marginRight: 10,
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
  title: {
    color: '#000000',
    fontSize: 35,
    fontWeight: '700',
    fontFamily: 'ProximaNova-Bold',
    marginBottom: 25,
    paddingRight: 100,
  },
  card: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#0f84a6',
    paddingVertical: 25,
    paddingHorizontal: 15,
    backgroundColor: '#FFE988',
    height: '100%',
  },
  inlineFields: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pickerField: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inlineField1: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingRight: 0,
    height: 40,
  },
  inlineField2: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingRight: 0,
    height: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 30,
    paddingHorizontal: 10,
    marginBottom: 10,
    height: 40,
  },
  usericon: {
    fontSize: 18,
    marginRight: 10,
    color: '#000000',
  },
  ageicon: {
    fontSize: 18,
    marginRight: 10,
    color: '#000000',
  },
  gendericon: {
    fontSize: 18,
    marginRight: 10,
    color: '#000000',
  },
  relationicon: {
    fontSize: 18,
    marginRight: 10,
    color: '#000000',
  },
  Countryicon: {
    fontSize: 18,
    marginRight: 10,
    color: '#000000',
  },
  emailicon: {
    fontSize: 18,
    marginRight: 10,
    color: '#000000',
  },
  phoneicon: {
    fontSize: 18,
    marginRight: 10,
    color: '#000000',
  },
  input: {
    flex: 1,
    color: '#000000',
    fontSize: 15,
  },
  inlineInput: {
    fontSize: 15,
  },
  passwordicon: {
    fontSize: 18,
    marginRight: 10,
    color: '#000000',
  },
  eyeicon: {
    fontSize: 18,
    color: '#000000',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  signinButton: {
    paddingVertical: 12,
    marginVertical: 6,
    backgroundColor: '#000000',
    paddingHorizontal: 12,
    borderRadius: 30,
  },
  submit: {
    marginTop: 45,
    marginBottom: 12,
  },
  bottomLink: {
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
  },
  signupLink: {
    color: '#000000',
    fontWeight: '700',
  },
  error: {
    color: 'red',
    padding: 10,
    marginBottom: 5,
  },
});
