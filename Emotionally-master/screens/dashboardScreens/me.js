import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Profile from './meComponents/profile';
import Settings from './meComponents/settings';
import {useNavigation} from '@react-navigation/native';
import AccountDetails from './meComponents/accountDetails';

const windowWidth = Dimensions.get('window').width;
const pageWidth = windowWidth - 40; // Subtracting twice the marginHorizontal

const Me = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Profile');
  const [showAccountDetails, setShowAccountDetails] = useState(false);

  const handleShowAccountDetails = () => {
    setShowAccountDetails(true);
  };

  const handleHideAccountDetails = () => {
    setShowAccountDetails(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {showAccountDetails ? (
        <AccountDetails
          navigation={navigation}
          hideAccountDetailsPage={handleHideAccountDetails}
        />
      ) : (
        <>
          <View style={styles.tabsContainer}>
            {['Profile', 'Settings'].map(tab => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={styles.tabButton}>
                <Text style={[styles.tabButtonText]}>{tab}</Text>
                {activeTab === tab && <View style={styles.activeLine} />}
              </TouchableOpacity>
            ))}
          </View>

          {/* Light gray horizontal line */}
          <View style={styles.horizontalLine} />

          <View style={styles.contentContainer}>
            {activeTab === 'Profile' && (
              <View>
                <Profile />
              </View>
            )}
            {activeTab === 'Settings' && (
              <View>
                <Settings
                  navigation={navigation}
                  showAccountDetails={handleShowAccountDetails}
                />
              </View>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Me;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 70,
    backgroundColor: 'white',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginLeft: 40,
    marginRight: 40,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  activeLine: {
    position: 'absolute',
    top: 47,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'black',
    borderRadius: 25,
  },
  tabButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
    paddingTop: 10,
    paddingBottom: 15,
  },
  horizontalLine: {
    height: 1,
    width: pageWidth,
    backgroundColor: 'gray',
    marginHorizontal: 20,
  },
  contentContainer: {
    marginVertical: 10,
  },
});
