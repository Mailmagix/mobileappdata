import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Arrows from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress'; // Corrected import
import ProgressArray from './topicsProgressArray';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const pageWidth = windowWidth - 40; // Subtracting twice the marginHorizontal

const Profile = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Image
        source={require('../../../assets/images/profileIllustration.png')}
        style={styles.imageIllustration}
        resizeMode="contain"
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
          fontWeight: '700',
          color: 'gray',
        }}>
        Level
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 25,
          fontWeight: '700',
          color: 'black',
        }}>
        Beginner
      </Text>
      <View style={styles.columnContainer}>
        <View style={styles.column}>
          <Text style={styles.number}>20 mins</Text>
          <Text style={styles.text}>Time</Text>
        </View>
        <View style={styles.verticalLine} />
        <View style={styles.column}>
          <Text style={styles.number}>14</Text>
          <Text style={styles.text}>Viewed</Text>
        </View>
        <View style={styles.verticalLine} />
        <View style={styles.column}>
          <Text style={styles.number}>8</Text>
          <Text style={styles.text}>Topics</Text>
        </View>
      </View>

      <View style={styles.viewingTopicsContainer}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'center',
          }}>
          Your Viewing Topics
        </Text>
        {/* Mapping through ProgressArray and rendering progress bars */}
        {ProgressArray.map((item, index) => (
          <View key={index} style={styles.progressContainer}>
            <Progress.Bar
              progress={parseFloat(item.progress) / 100}
              height={45}
              width={pageWidth}
              color={item.color}
              unfilledColor={item.unfilledcolor}
              borderRadius={10}
              borderWidth={0}
            />
            <View style={styles.progressTexts}>
              <Text style={styles.progressBarText}>{item.title}</Text>
              <Text style={styles.progressBarText}>{item.progress}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  imageIllustration: {
    width: 180,
    height: 180,
    marginVertical: 20,
    alignSelf: 'center',
  },
  columnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  number: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    marginTop: 5,
    fontSize: 15,
    textAlign: 'center',
  },
  verticalLine: {
    height: '100%', // Adjust the height as needed
    width: 1,
    backgroundColor: 'gray',
  },
  viewProgressContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#82E6E6',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  viewingTopicsContainer: {
    marginTop: 20,
  },
  progressContainer: {
    marginVertical: 10,
    alignItems: 'center',
    position: 'relative',
  },
  progressTexts: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 35,
    top: 10, // Adjust this value to position the texts within the progress bar
    left: 0,
    zIndex: 1,
  },
  progressBarText: {
    color: 'black',
    fontSize: 15,
  },
  progressText: {
    width: pageWidth,
    backgroundColor: '#ebedf0',
    borderRadius: 20,
    paddingVertical: 10,
    alignSelf: 'center',
    marginVertical: 10,
  },
  redFlag: {
    width: 40,
    height: 40,
    position: 'absolute',
    left: 30,
    top: 20,
    transform: [{rotate: '-20deg'}],
  },
});
