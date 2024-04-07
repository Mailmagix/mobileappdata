import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Arrows from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CommitmentsItem = () => {
  const windowWidth = Dimensions.get('window').width;
  const pan = useRef(new Animated.ValueXY()).current;
  const newViewOpacity = useRef(new Animated.Value(0)).current; // Control the opacity of the new view
  const [slideDirection, setSlideDirection] = useState(''); // Track slide direction

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      // Allow both leftward and rightward movement
      Animated.event([null, {dx: pan.x}], {
        useNativeDriver: false,
      })(e, gestureState);
    },
    onPanResponderRelease: (e, gestureState) => {
      if (gestureState.dx < -150) {
        setSlideDirection('left'); // Update slide direction to left
        // Handle leftward release by moving the walkContainer 70% off the left side of the screen
        Animated.timing(pan, {
          toValue: {x: -(windowWidth * 0.8), y: 0}, // 70% of windowWidth to the left
          useNativeDriver: false,
          duration: 300,
        }).start(() => {
          // Add this to make the new view visible when sliding to the left
          Animated.timing(newViewOpacity, {
            toValue: 1, // Fade in the new view
            useNativeDriver: false,
            duration: 300,
          }).start();
        });
      } else if (gestureState.dx > 150) {
        setSlideDirection('right'); // Update slide direction to right
        // Handle rightward release by moving the walkContainer 90% off the right side of the screen
        Animated.timing(pan, {
          toValue: {x: windowWidth * 0.8, y: 0}, // 70% of windowWidth to the right
          useNativeDriver: false,
          duration: 300,
        }).start(() => {
          // After sliding walkContainer to the right, reveal the new view
          Animated.timing(newViewOpacity, {
            toValue: 1, // Fade in the new view
            useNativeDriver: false,
            duration: 300,
          }).start();
        });
      } else {
        // Reset position for no significant movement
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          useNativeDriver: false,
        }).start(() => {
          // Make sure the new view stays hidden
          // newViewOpacity.setValue(0);
        });
      }
    },
  });

  // New function to reset the walk container view to its original position
  const resetWalkContainer = () => {
    Animated.timing(pan, {
      toValue: {x: 0, y: 0},
      useNativeDriver: false,
      duration: 300,
    }).start(() => {
      // Optional: Add additional logic here if needed
    });
  };

  // State to track whether the "YES" button has been clicked
  const [hasChecked, setHasChecked] = useState(false);

  // Function to save the state to AsyncStorage
  const saveCheckedState = async value => {
    try {
      await AsyncStorage.setItem(
        'hasChecked',
        JSON.stringify({
          checked: value,
          lastUpdated: new Date().toISOString(),
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Function to get the state from AsyncStorage
  const getCheckedState = async () => {
    try {
      const value = await AsyncStorage.getItem('hasChecked');
      if (value !== null) {
        const storedData = JSON.parse(value);
        const currentDate = new Date();
        const lastUpdatedDate = new Date(storedData.lastUpdated);

        if (
          currentDate.getDate() !== lastUpdatedDate.getDate() ||
          currentDate.getMonth() !== lastUpdatedDate.getMonth() ||
          currentDate.getFullYear() !== lastUpdatedDate.getFullYear()
        ) {
          // A new day has started since the last update, reset the state
          setHasChecked(false);
          saveCheckedState(false);
        } else {
          setHasChecked(storedData.checked);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [commitmentData, setCommitmentData] = useState([]);

  // Function to handle the click on the "YES" button
  const handleYesClick = async () => {
    setHasChecked(true);
    saveCheckedState(true); // Save to AsyncStorage

    //store commitment data with the current date
    const currentDate = new Date().toISOString();
    const currentDay = new Date().setHours(0, 0, 0, 0); // Timestamp for the current day

    const updatedData = {date: currentDate, completed: true};
    setCommitmentData(prevData => [...prevData, updatedData]);

    try {
      await AsyncStorage.setItem(
        currentDay.toString(),
        JSON.stringify(updatedData),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const currentDay = new Date().setHours(0, 0, 0, 0); // Timestamp for the current day
  const currentDayTimestamp = currentDay;

  // Reset hasChecked at the end of the day
  useEffect(() => {
    getCheckedState(); // Retrieve the state from AsyncStorage when the component mounts

    // Retrieve commitment data from AsyncStorage
    const retrieveCommitmentData = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();

        // Filter keys corresponding to previous days and current day
        const commitmentKeys = keys.filter(key => {
          const timestamp = parseInt(key);
          return !isNaN(timestamp) && timestamp <= currentDayTimestamp;
        });

        const commitments = await AsyncStorage.multiGet(commitmentKeys);

        // Process and set the commitment data in your state
        const commitmentData = commitments.map(([key, value]) =>
          JSON.parse(value),
        );
        setCommitmentData(commitmentData); // Initialize commitmentData state here
      } catch (error) {
        console.error(error);
      }
    };

    retrieveCommitmentData();
  }, []);

  return (
    <View style={styles.container}>
      {/* New View */}
      {slideDirection === 'left' ? (
        <Animated.View
          style={{
            ...styles.newViewContainer,
            opacity: newViewOpacity, // Controlled by newViewOpacity
            // Removed the transform property
          }}>
          {hasChecked ? (
            <View style={styles.checkSymbol}>
              {/* You can customize this view to display the check symbol */}
              <CheckIcon name="check-circle" size={100} color="#63D9A0" />
              <Text style={{color: 'black', textAlign: 'center', fontSize: 18}}>
                Great!
              </Text>
            </View>
          ) : (
            <View style={styles.newView}>
              <View>
                <Text style={styles.newViewText}>
                  Did You Walk 8 Kilometres Today?
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.button1, {backgroundColor: '#FF8E4F'}]}
                  onPress={resetWalkContainer}>
                  <Text style={styles.buttonText}>NOT YET</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button2, {backgroundColor: '#63D9A0'}]}
                  onPress={handleYesClick}>
                  <Text style={styles.buttonText}>YES</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Animated.View>
      ) : (
        <Animated.View
          style={{
            ...styles.newViewContainer,
            opacity: newViewOpacity, // Controlled by newViewOpacity
            // Removed the transform property
          }}>
          <Text style={styles.newViewText}>Come back tomorrow</Text>
        </Animated.View>
      )}

      <Animated.View
        {...panResponder.panHandlers}
        style={{
          ...styles.walkContainer,
          transform: [{translateX: pan.x}],
        }}>
        <View style={styles.cutoutLeft}>
          <View style={styles.circle1}>
            <Text style={styles.cutoutText}>PASS</Text>
          </View>
        </View>
        <View style={styles.cutoutRight}>
          <View style={styles.circle2}>
            <Text style={styles.cutoutText}>WILL DO</Text>
          </View>
        </View>
        <View style={styles.centerContainer}>
          <Text style={styles.kilometerText}>
            Take a long walk of 8 kilometres
          </Text>
        </View>
        <View style={styles.slideView}>
          <Arrows
            name="chevron-left"
            size={30}
            color="black"
            style={{fontWeight: 'bold'}}
          />
          <Text style={styles.slideText}>Slide Left or Right</Text>
          <Arrows
            name="chevron-right"
            size={30}
            color="black"
            style={{fontWeight: 'bold'}}
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default CommitmentsItem;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  walkContainer: {
    backgroundColor: '#82E6E6',
    borderRadius: 15,
    alignSelf: 'center',
    height: 300,
    width: 250,
    justifyContent: 'space-between', // Distributes the children along the vertical axis
    paddingVertical: 20, // Add some padding to prevent the text from touching the edges
  },
  cutoutLeft: {
    position: 'absolute',
    left: -45,
    top: '50%',
    marginTop: -30, // Half the height
    width: 80, // The width of the cutout
    height: 80, // The height of the cutout
    borderRadius: 40, // Half the height and width
    backgroundColor: '#FFE988', // Match the screen's background color
  },
  cutoutRight: {
    position: 'absolute',
    right: -45,
    top: '50%',
    marginTop: -30,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFE988',
  },
  circle1: {
    width: 70,
    height: 70,
    position: 'absolute',
    top: '6.5%',
    left: 2,
    borderRadius: 40,
    backgroundColor: '#FFC524',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  circle2: {
    width: 70,
    height: 70,
    position: 'absolute',
    top: '6.5%',
    right: 2,
    borderRadius: 40,
    backgroundColor: '#FFC524',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  cutoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  centerContainer: {
    flex: 1, // Takes up all available space
    justifyContent: 'center', // Centers content vertically
    paddingHorizontal: 50,
  },
  kilometerText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  slideText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  slideView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  newViewContainer: {
    alignSelf: 'center',
    height: 300,
    width: 250,
    position: 'absolute', // Position it in the same place as walkContainer
    justifyContent: 'center', // Center children vertically
    alignItems: 'center',
  },
  newView: {
    justifyContent: 'space-evenly',
    flex: 1, // Takes up all available space
    paddingVertical: 20,
  },
  newViewText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button1: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    width: 100,
  },
  button2: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    width: 100,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  checkSymbol: {
    position: 'absolute', // Position it absolutely within its parent container
    top: 0, // Start from the top
    bottom: 0, // Stretch to the bottom
    left: 0, // Start from the left
    right: 0, // Stretch to the right
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
});
