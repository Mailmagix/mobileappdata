import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {startOfWeek, isSameWeek} from 'date-fns';

const DidYouMeditate = () => {
  const usePersistedState = (key, defaultValue) => {
    const [state, setState] = useState(defaultValue);

    useEffect(() => {
      AsyncStorage.getItem(key).then(storedValue => {
        if (storedValue) {
          const parsedValue = JSON.parse(storedValue);
          const storedWeekStart = new Date(parsedValue.weekStart);
          const currentWeekStart = startOfWeek(new Date());

          if (isSameWeek(storedWeekStart, currentWeekStart)) {
            setState(parsedValue.meditationDays);
          } else {
            AsyncStorage.setItem(
              key,
              JSON.stringify({
                weekStart: startOfWeek(new Date()),
                meditationDays: defaultValue,
              }),
            );
          }
        } else {
          // If there's no value in storage, initialize with default value
          AsyncStorage.setItem(
            key,
            JSON.stringify({
              weekStart: startOfWeek(new Date()),
              meditationDays: defaultValue,
            }),
          );
        }
      });
    }, [key]);

    useEffect(() => {
      AsyncStorage.setItem(
        key,
        JSON.stringify({
          weekStart: startOfWeek(new Date()),
          meditationDays: state,
        }),
      );
    }, [key, state]);

    return [state, setState];
  };

  const daysOrder = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  const [selectedDay, setSelectedDay] = useState(null);
  const [meditationDays, setMeditationDays] = usePersistedState(
    'meditationDays',
    {},
  );

  useEffect(() => {
    const currentDayIndex = new Date().getDay(); // Get current day index (0 - Sunday, 1 - Monday, ..., 6 - Saturday)
    setSelectedDay(daysOrder[currentDayIndex]);
  }, []);

  const handleYesButtonPress = () => {
    setMeditationDays({...meditationDays, [selectedDay]: true});
  };

  const handleNotYetButtonPress = () => {
    setMeditationDays({...meditationDays, [selectedDay]: false});
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          {new Date()
            .toLocaleDateString('en-GB', {
              weekday: 'short',
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })
            .replace(/^(\w+),/, (match, p1) => `${p1.toUpperCase()} `)}
        </Text>
      </View>
      <View style={styles.daysContainer}>
        {daysOrder.map((day, index) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDay === day ? styles.selectedDay : null,
            ]}
            disabled={true} // Disable touch for day letters
          >
            <Text
              style={[
                styles.dayText,
                index > daysOrder.indexOf(selectedDay) ? {color: 'gray'} : null,
              ]}>
              {day}
            </Text>
            {meditationDays[day] && ( // Updated this line
              <Image
                source={require('../../assets/images/check-mark.png')}
                style={styles.tickMark}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button1, {backgroundColor: '#FF8E4F'}]}
          onPress={handleNotYetButtonPress}>
          <Text style={styles.buttonText}>NOT YET</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button2, {backgroundColor: '#63D9A0'}]}
          onPress={() => handleYesButtonPress(selectedDay)}>
          <Text style={styles.buttonText}>YES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  dateContainer: {
    backgroundColor: '#FFC524',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'center',
  },
  dateText: {
    fontWeight: '700',
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  dayButton: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 10,
  },
  dayText: {
    color: 'black',
    fontWeight: 'bold',
  },
  selectedDay: {
    backgroundColor: '#FFC524',
  },
  tickMark: {
    position: 'absolute',
    top: -22,
    right: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  button1: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    width: 120,
  },
  button2: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    width: 120,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default DidYouMeditate;
