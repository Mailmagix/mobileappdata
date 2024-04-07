import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import EmotionallyLogo from '../assets/images/EmotionallyLogo.png';
import ArrowIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const SCREEN_WIDTH = Dimensions.get('window').width;

const OnBoardingScreens = ({navigation}) => {
  const [activeScreen, setActiveScreen] = useState(0);
  const flatListRef = useRef(null);

  const screens = [
    {
      logo: EmotionallyLogo,
      heading: 'About',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      logo: EmotionallyLogo,
      heading: 'What Is Inside',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      logo: EmotionallyLogo,
      heading: 'What Is Inside',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      logo: EmotionallyLogo,
      heading: 'FAQ',
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ];

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const screenIndex = Math.round(contentOffsetX / SCREEN_WIDTH);
    setActiveScreen(screenIndex);
  };

  useEffect(() => {
    // Start automatic horizontal scrolling and indicator updates
    const interval = setInterval(() => {
      const nextScreenIndex = (activeScreen + 1) % screens.length;
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: nextScreenIndex,
          animated: true,
        });
      }
      setActiveScreen(nextScreenIndex);
    }, 3000);

    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  }, [activeScreen, screens]);

  const handleSkip = () => {
    // Redirect to the login page when the skip button is pressed
    navigation.navigate('Login');
  };

  const handleGetStarted = () => {
    // Redirect to the login page when the "GET STARTED" button is pressed
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {activeScreen !== screens.length - 1 && ( // Render skip button if not on the last screen
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={{color: 'black'}}>Skip</Text>
          <ArrowIcon name="chevron-double-right" size={20} color="black" />
        </TouchableOpacity>
      )}
      <FlatList // Use FlatList instead of ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={screens}
        renderItem={({item, index}) => (
          <View style={styles.screen}>
            <Image source={item.logo} style={styles.logo} resizeMode="cover" />
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                marginTop: 20,
                color: 'black',
              }}>
              {item.heading}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                paddingHorizontal: 20,
                fontSize: 15,
                color: 'black',
                marginTop: 20,
              }}>
              {item.description}
            </Text>
            {index === screens.length - 1 && (
              <TouchableOpacity
                onPress={handleGetStarted}
                style={styles.getStartedButton}>
                <Text style={{color: 'white', fontSize: 15, fontWeight: '700'}}>
                  GET STARTED
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        onScroll={event => handleScroll(event)}
        ref={flatListRef} // Ref for FlatList
      />
      <View style={styles.indicators}>
        {screens.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              {
                backgroundColor: activeScreen === index ? 'black' : 'lightgray',
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default OnBoardingScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicators: {
    flexDirection: 'row',
    position: 'relative',
    bottom: 20,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
  skipButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    zIndex: 99999,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: 100,
    height: 100,
  },
  getStartedButton: {
    borderRadius: 25,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
