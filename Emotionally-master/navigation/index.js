import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home';
import Dashboard from '../screens/dashboard';
import Login from '../screens/login';
import SignUp from '../screens/signUp';
import ForgotPassword from '../screens/forgotPassword';
import ConfirmEmail from '../screens/confirmEmail';
import OtpCode from '../screens/otpCode';
import SplashScreen from '../screens/splashScreen';
import FirstAid from '../screens/dashboardScreens/firstAid';
import UploadImageForAnger from '../screens/dashboardScreens/uploadImageForAnger';
import AngerShooting from '../screens/dashboardScreens/angerShooting';
import AudioPlayer from '../screens/dashboardScreens/audioLibrary/audioPLayer';
import AudioItem from '../screens/dashboardScreens/audioLibrary/audioItem';
import ReadArticlePage from '../screens/dashboardScreens/articleLibrary/readArticlePage';
import Topics from '../screens/dashboardScreens/topics';
import SignUpOtpCode from '../screens/signUpOtpCode';
import Settings from '../screens/dashboardScreens/meComponents/settings';
import AccountDetails from '../screens/dashboardScreens/meComponents/accountDetails';
import Me from '../screens/dashboardScreens/me';
import MyJournal from '../screens/dashboardScreens/myJournal';
import JournalEditorScreen from '../screens/dashboardScreens/myJournalComponents/journalEditorScreen';
import OnBoardingScreens from '../screens/onBoardingScreens';
import LikedItems from '../screens/dashboardScreens/likedItems';
import LikedAudioItems from '../screens/dashboardScreens/audioLibrary/likedAudioItems';
import Notifications from '../screens/dashboardScreens/notifications';
import Loneliness from '../screens/dashboardScreens/topicsComponents/lifeCategories';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OnBoardingScreens"
        component={OnBoardingScreens}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpOtpCode"
        component={SignUpOtpCode}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ConfirmEmail"
        component={ConfirmEmail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OtpCode"
        component={OtpCode}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FirstAid"
        component={FirstAid}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UploadImageForAnger"
        component={UploadImageForAnger}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AngerShooting"
        component={AngerShooting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AudioItem"
        component={AudioItem}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AudioPlayer"
        component={AudioPlayer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReadArticlePage"
        component={ReadArticlePage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Topics"
        component={Topics}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Loneliness"
        component={Loneliness}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Me" component={Me} options={{headerShown: false}} />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AccountDetails"
        component={AccountDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyJournal"
        component={MyJournal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="JournalEditorScreen"
        component={JournalEditorScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LikedItems"
        component={LikedItems}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LikedAudioItems"
        component={LikedAudioItems}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
