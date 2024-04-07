import {BackHandler, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Fitness from './homeComponents/myFitnessComponents/fitness';
import Activity from './homeComponents/myFitnessComponents/activity';
import {useDispatch} from 'react-redux';
import Stress from './homeComponents/myFitnessComponents/fitnessComponents/stress';
import {
  removeLastBreadcrumb,
  setBreadcrumb,
} from '../../store/actions/breadcrumbActions';
import Anxiety from './homeComponents/myFitnessComponents/fitnessComponents/anxiety';
import Burnout from './homeComponents/myFitnessComponents/fitnessComponents/burnout';
import Aerobics from './homeComponents/myFitnessComponents/fitnessComponents/aerobics';
import Zumba from './homeComponents/myFitnessComponents/fitnessComponents/zumba';
import Hiking from './homeComponents/myFitnessComponents/fitnessComponents/hiking';
import Crossfit from './homeComponents/myFitnessComponents/fitnessComponents/crossfit';
import Cycling from './homeComponents/myFitnessComponents/fitnessComponents/cycling';
import Walking from './homeComponents/myFitnessComponents/fitnessComponents/walking';
import WorryTree from './homeComponents/myFitnessComponents/activityComponents/worryTree';
import MyReports from './homeComponents/myFitnessComponents/myReports';

const MyFitness = () => {
  const [activeTab, setActiveTab] = useState('Fitness'); // Setting 'Fitness' as the default active tab
  const [currentPage, setCurrentPage] = useState('Tabs');

  const dispatch = useDispatch();

  // Define your tabs in an array
  const tabs = ['Fitness', 'Activity'];

  useEffect(() => {
    const backAction = () => {
      if (currentPage === 'Stress') {
        setCurrentPage('Tabs');
        dispatch(removeLastBreadcrumb());
        return true; // This will prevent the app from closing
      } else if (currentPage === 'Anxiety') {
        setCurrentPage('Tabs');
        dispatch(removeLastBreadcrumb());
        return true;
      } else if (currentPage === 'Burnout') {
        setCurrentPage('Tabs');
        dispatch(removeLastBreadcrumb());
        return true;
      } else if (currentPage === 'Aerobics') {
        setCurrentPage('Tabs');
        dispatch(removeLastBreadcrumb());
        return true;
      } else if (currentPage === 'Zumba') {
        setCurrentPage('Tabs');
        dispatch(removeLastBreadcrumb());
        return true;
      } else if (currentPage === 'Hiking') {
        setCurrentPage('Tabs');
        dispatch(removeLastBreadcrumb());
        return true;
      } else if (currentPage === 'Crossfit') {
        setCurrentPage('Tabs');
        dispatch(removeLastBreadcrumb());
        return true;
      } else if (currentPage === 'Cycling') {
        setCurrentPage('Tabs');
        dispatch(removeLastBreadcrumb());
        return true;
      } else if (currentPage === 'Walking') {
        setCurrentPage('Tabs');
        dispatch(removeLastBreadcrumb());
        return true;
      } else if (currentPage === 'Worry Tree') {
        setCurrentPage('Tabs');
        dispatch(removeLastBreadcrumb());
        return true;
      } else if (currentPage === 'My Reports') {
        setCurrentPage('Tabs');
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

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  const handlePress = action => {
    if (action === 'Stress') {
      setCurrentPage('Stress');
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
    } else if (action === 'Zumba') {
      setCurrentPage('Zumba');
      dispatch(setBreadcrumb(action));
    } else if (action === 'Hiking') {
      setCurrentPage('Hiking');
      dispatch(setBreadcrumb(action));
    } else if (action === 'Crossfit') {
      setCurrentPage('Crossfit');
      dispatch(setBreadcrumb(action));
    } else if (action === 'Cycling') {
      setCurrentPage('Cycling');
      dispatch(setBreadcrumb(action));
    } else if (action === 'Walking') {
      setCurrentPage('Walking');
      dispatch(setBreadcrumb(action));
    } else if (action === 'Worry Tree') {
      setCurrentPage('Worry Tree');
      dispatch(setBreadcrumb(action));
    } else {
      setCurrentPage('Tabs');
    }
  };

  const handleMyReports = () => {
    setCurrentPage('My Reports');
    dispatch(setBreadcrumb('My Reports'));
  };

  if (currentPage === 'My Reports') {
    return (
      <View style={styles.container}>
        <MyReports />
      </View>
    );
  }

  if (currentPage === 'Stress') {
    return (
      <View style={styles.container}>
        <Stress />
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
  } else if (currentPage === 'Zumba') {
    return (
      <View style={styles.container}>
        <Zumba />
      </View>
    );
  } else if (currentPage === 'Hiking') {
    return (
      <View style={styles.container}>
        <Hiking />
      </View>
    );
  } else if (currentPage === 'Crossfit') {
    return (
      <View style={styles.container}>
        <Crossfit />
      </View>
    );
  } else if (currentPage === 'Cycling') {
    return (
      <View style={styles.container}>
        <Cycling />
      </View>
    );
  } else if (currentPage === 'Walking') {
    return (
      <View style={styles.container}>
        <Walking />
      </View>
    );
  } else if (currentPage === 'Worry Tree') {
    return (
      <View style={styles.container}>
        <WorryTree />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleMyReports}>
        <Text
          style={{
            color: 'black',
            fontWeight: '600',
            marginHorizontal: 20,
            textDecorationLine: 'underline',
            textAlign: 'right',
          }}>
          My Reports
        </Text>
      </TouchableOpacity>
      <View style={styles.tabsContainer}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => handleTabChange(tab)}>
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.content}>
        {activeTab === 'Fitness' && <Fitness onChangeContent={handlePress} />}
        {activeTab === 'Activity' && <Activity onChangeContent={handlePress} />}
      </View>
    </View>
  );
};

export default MyFitness;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#E9DBF9',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  tab: {
    height: 35,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'black',
    borderRadius: 25,
  },
  tabText: {
    color: 'black',
  },
  activeTabText: {
    color: 'white',
  },
  content: {
    fontSize: 18,
  },
});
