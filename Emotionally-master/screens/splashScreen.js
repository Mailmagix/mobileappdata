import {StyleSheet, Text, View, Image, Animated} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {userApiServer} from '../config';

const SplashScreen = ({navigation}) => {
  const opacity = new Animated.Value(1);

  useEffect(() => {
    const animation = Animated.timing(opacity, {
      toValue: 0,
      duration: 3000, // Adjust the duration as needed
      useNativeDriver: true,
    });

    const checkSessionAndNavigate = async () => {
      // Check if the session is stored in AsyncStorage
      const sessionId = await AsyncStorage.getItem('sessionId');
      const token = await AsyncStorage.getItem('token');

      try {
        // Make an API request to validate the session
        const response = await axios.get(
          `${userApiServer}/users/session/${sessionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Replace with your authentication token
            },
          },
        );

        // If the session is valid (status code 200), navigate to the "Dashboard" screen
        if (response.status === 200) {
          navigation.navigate('Dashboard');
        } else {
          // Otherwise, navigate to the "OnBoardingScreens" screen
          navigation.navigate('OnBoardingScreens');
        }
      } catch (error) {
        // Handle errors, such as network issues or server errors
        // Navigate to "OnBoardingScreens" as a fallback
        navigation.navigate('OnBoardingScreens');
      }
    };

    const timer = setTimeout(() => {
      checkSessionAndNavigate();
    }, 3500);

    // Start the animation
    animation.start();

    // Clear the timer and stop the animation when the component is unmounted
    return () => {
      clearTimeout(timer);
      animation.stop();
    };
  }, [opacity]);

  // useEffect(() => {
  //   // Check session after animation is completed
  //   if (animationCompleted) {
  //     checkSessionAndNavigate();
  //   }
  // }, [animationCompleted]);

  return (
    <View style={styles.container}>
      <Animated.View style={{opacity}}>
        <View style={styles.centeredContent}>
          <Image
            source={require('../assets/images/EmotionallyLogo.png')}
            style={styles.logo}
          />
          <Text
            style={{
              fontSize: 25,
              fontWeight: '700',
              color: 'black',
              textAlign: 'center',
              alignSelf: 'center',
              marginTop: 10,
            }}>
            We Care From Our Heart
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#edea98',
  },
  centeredContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});
