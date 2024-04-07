import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PhoneIcon from 'react-native-vector-icons/FontAwesome5';
import PasswordIcon from 'react-native-vector-icons/MaterialIcons';
import EyeIcon from 'react-native-vector-icons/Entypo';
import HeaderIcon from 'react-native-vector-icons/Feather';
import FacebookIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import GoogleIcon from 'react-native-vector-icons/FontAwesome';
import AppleIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {login, clearError} from '../store/actions/authActions';
import {useFocusEffect} from '@react-navigation/native';

const Login = ({navigation, login, error, clearError}) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true; // Return true to prevent default back button behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Clean up the event listener when the component is unmounted
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    setIsLoading(true);
    const credentials = {
      email,
      password,
    };
    login(credentials, navigation)
      .then(() => {
        setIsLoading(false);
        setEmail('');
        setPassword('');
      })
      .catch(err => {
        // handle error
        setIsLoading(false);
        console.error('Login failed:', error);
      });
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => clearError();
    }, []),
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={() => BackHandler.exitApp()}>
          <Text style={styles.backicon}>
            <HeaderIcon name="arrow-left-circle" size={40} />
            &nbsp;&nbsp;
          </Text>
        </TouchableOpacity>
        <Text style={styles.title}>Welcome Back</Text>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <EmailIcon name="email" style={styles.emailicon} />
          <PhoneIcon name="phone-alt" style={styles.phoneicon} />
          <TextInput
            style={styles.input}
            placeholder="Email / Phone number"
            placeholderTextColor="black"
            value={email}
            onChangeText={email => setEmail(email)}
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
            onChangeText={password => setPassword(password)}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <EyeIcon
              name={isPasswordVisible ? 'eye-with-line' : 'eye'}
              style={styles.eyeicon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.leftLink}>
            <Text style={styles.otpLink}>Sign in with OTP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rightLink}
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.signintext}>OR SIGN IN WITH</Text>
        <View style={styles.line} />
        <View style={styles.socialIconsContainer}>
          <TouchableOpacity>
            <FacebookIcon name="facebook" style={styles.socialicon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <GoogleIcon name="google" style={styles.socialicon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <AppleIcon name="apple" style={styles.socialicon} />
          </TouchableOpacity>
        </View>
        <View style={styles.submit}>
          <TouchableOpacity style={styles.signinButton} onPress={handleLogin}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>SIGN IN</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.bottomLink}>
              Don't have an account?
              <Text style={styles.signupLink}> SIGN UP</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  error: state.auth.error,
});

const mapDispatchToProps = {
  login,
  clearError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    flexGrow: 1,
    flexDirection: 'column',
    fontFamily: 'ProximaNova',
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
    fontFamily: 'ProximaNova',
    color: '#000000',
    fontSize: 35,
    fontWeight: '700',
    marginBottom: 25,
    paddingRight: 150,
  },
  card: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#000000',
    padding: 25,
    backgroundColor: '#FFE988',
    height: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  emailicon: {
    fontSize: 18,
    color: '#000000',
  },
  phoneicon: {
    fontSize: 12,
    marginRight: 18,
    marginLeft: -21,
    marginTop: 9,
    color: '#000000',
  },
  input: {
    flex: 1,
    color: '#000000',
  },
  passwordicon: {
    fontSize: 20,
    marginRight: 10,
    color: '#000000',
  },
  eyeicon: {
    fontSize: 20,
    color: '#000000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  leftLink: {
    alignItems: 'flex-start',
  },
  rightLink: {
    alignItems: 'flex-end',
  },
  otpLink: {
    fontSize: 15,
    color: '#000000',
    textDecorationLine: 'underline',
  },
  forgotPassword: {
    fontSize: 15,
    color: '#000000',
    textDecorationLine: 'underline',
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialicon: {
    color: '#000000',
    fontSize: 40,
  },
  signintext: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    fontWeight: '700',
    textAlign: 'center',
  },
  line: {
    height: 1,
    backgroundColor: '#000000',
    marginTop: 5,
    marginBottom: 10,
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
    marginTop: 100,
    marginBottom: 20,
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
