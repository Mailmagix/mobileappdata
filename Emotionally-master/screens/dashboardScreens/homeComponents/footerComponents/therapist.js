import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TherapistDoctorsArray from './therapistDoctorsArray';
import {useDispatch} from 'react-redux';
import {
  removeLastBreadcrumb,
  setBreadcrumb,
} from '../../../../store/actions/breadcrumbActions';
import BookTherapy from './bookTherapy';

const Therapist = () => {
  const [currentPage, setCurrentPage] = useState('Therapist');
  const [selectedDoctor, setSelectedDoctor] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    const backAction = () => {
      if (currentPage === 'bookTherapy') {
        setCurrentPage('Therapist');
        dispatch(removeLastBreadcrumb());
        return true; // This will prevent the app from closing
      }
      return false; // This will use the default back button behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [currentPage]);

  const handlePress = doctor => {
    setSelectedDoctor(doctor);
    setCurrentPage('bookTherapy');
    dispatch(setBreadcrumb('Book a Therapy'));
  };

  if (currentPage === 'bookTherapy') {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <BookTherapy doctor={selectedDoctor} />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.doctorsContainer}>
        {TherapistDoctorsArray.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.doctors,
              {
                backgroundColor: item.backgroundColor,
              },
            ]}
            onPress={() => handlePress(item)}>
            <Image
              source={item.doctorImage}
              style={styles.doctorImage}
              resizeMode="contain"
            />
            <Text style={{color: 'black', fontSize: 14, marginTop: 5}}>
              {item.doctorName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Therapist;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  doctorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  doctorImage: {
    height: 60,
    width: 60,
    alignSelf: 'center',
  },
  doctors: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 110,
    width: 100,
    marginBottom: 10,
  },
});
