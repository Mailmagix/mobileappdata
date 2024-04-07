import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Info = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../../assets/images/EmotionallyLogo.png')}
          style={styles.logo}
        />
        <View style={styles.headingContainer}>
          <Text style={styles.header}>Emotionally</Text>
          <Text style={styles.subHeader}>IND Partner</Text>
        </View>
      </View>
      <View style={styles.descriptionSection}>
        <Icon
          name="information-outline"
          size={25}
          style={styles.descriptionIcon}
        />
        <Text style={styles.description}>
          The developer has provided this information about how they will
          collect, share, and store your data
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.dataSafetyHeader}>About Us</Text>
        <Text style={styles.dataSafetyContent}>
          Set up in 2012, Indipartners Health Consultancy LLP launched its
          Emotional and Mental Healthcare Services in 2020 under the brand name
          Emotionally. We have helped over 22,000 Corporate Employees and their
          families belonging to reputed firms like the Mahindra Group, the Birla
          Group, Mckinsey & Company, etc. Emotionally’s four founders are highly
          reputed industry veterans with over 30 years of experience each in
          India and international countries. The founders are supported by a
          large team of highly qualified and experienced Psychologists,
          Psychiatrists, Coaches and Educators based in all the major cities in
          India. Emotionally is headquartered at Alibag, a rapidly developing
          suburb of Mumbai.{' '}
          <Text style={{textDecorationLine: 'underline'}}>
            Learn more about data collection
          </Text>
        </Text>
        {/* Shared Data Section */}
        <View style={styles.sharedDataSection}>
          <Text style={styles.sectionTitle}>Shared data</Text>
          <Text style={{color: 'grey', fontSize: 15}}>
            Shared with other companies or organizations
          </Text>

          {/* Personal Info */}
          <View style={styles.itemWithIcon}>
            <Icon
              name="account-circle-outline"
              size={25}
              style={styles.leftIcon}
            />
            <View style={{justifyContent: 'center', width: '80%'}}>
              <Text style={styles.contentTitle}>Personal info</Text>
              <Text style={styles.contentText}>
                Email address, Address, Phone number, Race and ethnicity
              </Text>
            </View>

            <TouchableOpacity>
              <Icon name="chevron-down" size={20} style={styles.rightIcon} />
            </TouchableOpacity>
          </View>

          {/* Location */}
          <View style={styles.itemWithIcon}>
            <Icon name="map-marker-outline" size={25} style={styles.leftIcon} />
            <View style={{justifyContent: 'center', width: '80%'}}>
              <Text style={styles.contentTitle}>Location</Text>
              <Text style={styles.contentText}>Approximate location</Text>
            </View>

            <TouchableOpacity>
              <Icon name="chevron-down" size={20} style={styles.rightIcon} />
            </TouchableOpacity>
          </View>

          {/* App Activity */}
          <View style={styles.itemWithIcon}>
            <Icon name="gesture-double-tap" size={25} style={styles.leftIcon} />
            <View style={{justifyContent: 'center', width: '80%'}}>
              <Text style={styles.contentTitle}>App activity</Text>
              <Text style={styles.contentText}>Page views</Text>
            </View>

            <TouchableOpacity>
              <Icon name="chevron-down" size={20} style={styles.rightIcon} />
            </TouchableOpacity>
          </View>
        </View>
        {/* Collected Data Section */}
        <View style={styles.collectedDataSection}>
          <Text style={styles.sectionTitle}>Collected data</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.contentText}>
              Collected by this app from your device
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: 'black',
  },
  logoContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginRight: 10,
  },
  headingContainer: {
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  subHeader: {
    fontSize: 18,
    color: 'grey',
  },
  descriptionSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Set your desired color
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 20,
  },
  descriptionIcon: {
    marginRight: 8,
    color: 'grey', // Set your desired icon color
  },
  description: {
    fontSize: 15,
    color: 'grey',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 10,
    elevation: 3, // for Android
    shadowColor: '#000', // for iOS
    shadowOffset: {width: 0, height: 2}, // for iOS
    shadowOpacity: 0.1, // for iOS
    shadowRadius: 4, // for iOS
    paddingBottom: 100,
  },
  dataSafetyHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'black',
  },
  dataSafetyContent: {
    fontSize: 15,
    marginTop: 18,
    color: 'grey',
  },
  sharedDataSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  itemWithIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  leftIcon: {
    color: 'grey',
    marginRight: 8,
  },
  rightIcon: {
    color: 'grey',
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1, // This ensures the title takes up the remaining space
    color: 'black',
  },
  contentText: {
    fontSize: 16,
    color: 'grey',
  },
  sectionContent: {
    marginTop: 8,
  },
  collectedDataSection: {
    marginTop: 20,
  },
});
