import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import SaveIcon from 'react-native-vector-icons/Feather';

const BookTherapy = ({doctor}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Reset form fields when the doctor changes
  useEffect(() => {
    setName('');
    setEmail('');
    setPhone('');
    setDate(new Date());
    setTime(new Date());
    // Other field resets if necessary
  }, [doctor]);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  // Format the date to a readable format
  const formatDate = date => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatTime = time => {
    let hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Book a Therapy</Text>
      <Text style={styles.doctorName}>{doctor.doctorName}</Text>
      <View style={styles.formFields}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name :</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#91918e"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email :</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#91918e"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone :</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone number"
            placeholderTextColor="#91918e"
            keyboardType="numeric"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Date :</Text>
          <TouchableOpacity onPress={showDatepicker} style={{flex: 1}}>
            <TextInput
              style={styles.input}
              placeholder="Select Date"
              placeholderTextColor="#91918e"
              value={formatDate(date)}
              editable={false} // The TextInput is not directly editable
            />
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          {/* Time Input */}
          <Text style={styles.inputLabel}>Time :</Text>
          <TouchableOpacity onPress={showTimepicker} style={{flex: 1}}>
            <TextInput
              style={styles.input}
              placeholder="Select Time"
              placeholderTextColor="#91918e"
              value={formatTime(time)}
              editable={false}
            />
            {showTimePicker && (
              <DateTimePicker
                testID="timePicker"
                value={time}
                mode="time"
                display="default"
                onChange={onTimeChange}
              />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.saveButton}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: 'green',
              borderRadius: 15,
              padding: 10,
              width: 80,
            }}>
            <SaveIcon name="save" size={20} color="white" />
            <Text style={{color: 'white', fontSize: 15}}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookTherapy;

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    flex: 1,
    fontFamily: 'ProximaNova-Regular',
  },
  heading: {
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: 'black',
    textAlign: 'center',
    fontWeight: '600',
  },
  doctorName: {
    fontSize: 18,
    color: 'blue',
    marginTop: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  formFields: {
    marginVertical: 15,
    marginHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    height: 40,
  },
  inputLabel: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    width: 52,
  },
  input: {
    flex: 1,
    color: '#000000',
    fontSize: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 30,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  saveButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
});
