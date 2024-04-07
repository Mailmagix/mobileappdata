import {View, Text, StyleSheet, PanResponder, Image} from 'react-native';
import React, {useRef, useState} from 'react';

const FeelingRangeSlider = () => {
  const options = ['Distressed', "I'm not sure", 'Never better'];

  // Add an array of image sources that correspond to each of the options
  const imageSources = [
    require('../../assets/images/Distressed.png'),
    require('../../assets/images/ImNotSure.png'),
    require('../../assets/images/NeverBetter.png'),
  ];

  const [selectedIndex, setSelectedIndex] = useState(1);
  const sliderRef = useRef(null);
  const sliderWidth = useRef(0);

  const handlePanResponderMove = (_, gestureState) => {
    const newPosition = Math.round(gestureState.moveX);
    const totalWidth = sliderWidth.current;
    const optionWidth = totalWidth / (options.length - 1);

    if (newPosition >= 0 && newPosition <= totalWidth) {
      setSelectedIndex(Math.round(newPosition / optionWidth));
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: handlePanResponderMove,
    }),
  ).current;

  return (
    <View style={styles.container}>
      <View
        style={styles.sliderContainer}
        ref={sliderRef}
        {...panResponder.panHandlers}
        onLayout={event => {
          sliderWidth.current = event.nativeEvent.layout.width;
        }}>
        {/* Vertical lines */}
        <View style={styles.verticalLine} />
        <View style={[styles.verticalLine, {right: 0}]} />

        {/* Horizontal line */}
        <View style={styles.horizontalLine}>
          <View style={[styles.activeLine]} />
        </View>

        {/* Active circle */}
        <Image
          source={imageSources[selectedIndex]}
          style={[
            styles.activeImage,
            {
              left: `${
                selectedIndex === 0 // Check if it's the left option
                  ? -4 // Set left position to 0 for left option
                  : (selectedIndex / (options.length - 1)) * 100 - 7.5 // Center for other options
              }%`,
            },
          ]}
        />

        {/* Options */}
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <Text key={index} style={styles.optionText}>
              {option}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default FeelingRangeSlider;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    // marginLeft: 20,
  },
  sliderContainer: {
    width: '100%',
    position: 'relative',
  },
  verticalLine: {
    position: 'absolute',
    width: 3,
    height: 22,
    backgroundColor: '#FFD84A',
    top: 20,
  },
  horizontalLine: {
    position: 'absolute',
    width: '100%',
    height: 3,
    backgroundColor: '#FFD84A',
    top: 30,
    justifyContent: 'center',
  },
  activeLine: {
    width: 3,
    height: 15,
    backgroundColor: '#FFD84A',
    position: 'absolute',
    top: -6,
    alignSelf: 'center',
  },
  activeImage: {
    width: 35,
    height: 35,
    position: 'absolute',
    top: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  optionText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
});
