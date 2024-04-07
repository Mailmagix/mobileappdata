import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ActivitiesArray from './homeComponents/myActivityComponents/activitiesArray';
import {useDispatch} from 'react-redux';
import WorryTree from './homeComponents/myFitnessComponents/activityComponents/worryTree';
import Anxiety from './homeComponents/myFitnessComponents/fitnessComponents/anxiety';
import Burnout from './homeComponents/myFitnessComponents/fitnessComponents/burnout';
import Aerobics from './homeComponents/myFitnessComponents/fitnessComponents/aerobics';
import {
  removeLastBreadcrumb,
  setBreadcrumb,
} from '../../store/actions/breadcrumbActions';

const MyActivities = () => {
  const [currentPage, setCurrentPage] = useState('activities');

  const dispatch = useDispatch();

  useEffect(() => {
    const backAction = () => {
      if (currentPage === 'Worry Tree') {
        setCurrentPage('activities');
        dispatch(removeLastBreadcrumb());
        return true;
      } else if (currentPage === 'Anxiety') {
        setCurrentPage('activities');
        dispatch(removeLastBreadcrumb());
        return true;
      } else if (currentPage === 'Burnout') {
        setCurrentPage('activities');
        dispatch(removeLastBreadcrumb());
        return true;
      } else if (currentPage === 'Aerobics') {
        setCurrentPage('activities');
        dispatch(removeLastBreadcrumb());
        return true;
      }
      return false; // This will use the default back button behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [currentPage]);

  const handlePress = action => {
    if (action === 'Worry Tree') {
      setCurrentPage('Worry Tree');
      dispatch(setBreadcrumb(action));
    } else if (action === 'Anxiety') {
      setCurrentPage('Anxiety');
      dispatch(setBreadcrumb(action));
    } else if (action === 'Burnout') {
      setCurrentPage('Burnout');
      dispatch(setBreadcrumb(action));
    } else if (action === 'Aerobics') {
      setCurrentPage('Aerobics');
      dispatch(setBreadcrumb(action));
    } else {
      setCurrentPage('activities');
    }
  };

  if (currentPage === 'Worry Tree') {
    return (
      <View style={styles.container}>
        <WorryTree />
      </View>
    );
  } else if (currentPage === 'Anxiety') {
    return (
      <View style={styles.container}>
        <Anxiety />
      </View>
    );
  } else if (currentPage === 'Burnout') {
    return (
      <View style={styles.container}>
        <Burnout />
      </View>
    );
  } else if (currentPage === 'Aerobics') {
    return (
      <View style={styles.container}>
        <Aerobics />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.activitiesContainer}>
        {ActivitiesArray.map((item, index) => (
          <View key={index} style={styles.activityView}>
            <TouchableOpacity
              style={[
                styles.activities,
                {
                  backgroundColor: item.backgroundColor,
                },
              ]}
              onPress={() => handlePress(item.title)}>
              <Image
                source={item.image}
                style={styles.activityImage}
                resizeMode="contain"
              />
              <Text style={{color: 'black', fontSize: 15}}>{item.title}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => handlePress(item.title)}>
              <Text style={styles.startButtonText}>CLICK TO SEE</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default MyActivities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  activitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  activityImage: {
    height: 80,
    width: 80,
    alignSelf: 'center',
  },
  activityView: {
    marginBottom: 20,
  },
  activities: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 110,
    width: 100,
  },
  startButton: {
    marginTop: 5,
    backgroundColor: '#FFC524',
    width: 100,
    height: 25,
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 10,
  },
});
