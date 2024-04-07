import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import FeelingRangeSlider from './feelingRangeSlider';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Arrows from 'react-native-vector-icons/MaterialCommunityIcons';
import MultiPageOptions from './homeComponents/multiPageOptions';
import {setBreadcrumb} from '../../store/actions/breadcrumbActions';

const windowWidth = Dimensions.get('window').width;
const listItemWidth = windowWidth - 40; // Subtracting twice the marginHorizontal

const Home = ({
  navigation,
  onSeeNewPress,
  onTopicsPress,
  onTalksPress,
  onMyFitnessPress,
  onMyActivitiesPress,
  onReadNowPress,
}) => {
  const isLoggedIn = useSelector(state => state.sessionDetails.isLoggedIn);
  const user = useSelector(state => state.sessionDetails.user);

  const dispatch = useDispatch();

  const handlePress = action => {
    if (action === 'My Journal') {
      // dispatch(setBreadcrumb(action)); // Assuming 'action' is the breadcrumb text.
      navigation.navigate('MyJournal');
    } else if (action === 'Topics') {
      dispatch(setBreadcrumb(action));
      onTopicsPress(action);
    } else if (action === 'Talks') {
      dispatch(setBreadcrumb(action));
      onTalksPress(action);
    } else if (action === 'My Fitness') {
      dispatch(setBreadcrumb(action));
      onMyFitnessPress(action);
    } else if (action === 'My Activities') {
      dispatch(setBreadcrumb(action));
      onMyActivitiesPress(action);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.bannerContainer}>
          <View>
            <Text style={{color: '#000', fontSize: 14, fontWeight: 700}}>
              New article on loneliness
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#63D9A0',
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                height: 30,
                width: 95,
                marginTop: 5,
              }}
              onPress={onReadNowPress}>
              <Text style={{color: '#000', fontSize: 12, fontWeight: 700}}>
                READ NOW
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require('../../assets/images/bannerImage.png')}
            style={styles.bannerImage}
            resizeMode="contain"
          />
        </View>
        <View style={{alignItems: 'center', marginTop: 10, marginBottom: 15}}>
          {isLoggedIn && (
            <Text style={{color: '#000', fontSize: 25, fontWeight: '700'}}>
              Welcome back {user ? user.name : 'Guest'}!
            </Text>
          )}
        </View>
        <View style={styles.feelingRange}>
          <Text style={styles.question}>How are you feeling today?</Text>
          <FeelingRangeSlider />
        </View>
        <View style={styles.multipagesContainer}>
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              fontWeight: '700',
              textAlign: 'center',
            }}>
            What do you want to do now?
          </Text>
          <View style={{marginTop: 20}}>
            <TouchableOpacity
              style={styles.seeNewOption}
              onPress={onSeeNewPress}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 15, fontWeight: '500', color: 'black'}}>
                  See New
                </Text>
                <Image
                  source={require('../../assets/images/newProduct.png')}
                  style={{marginLeft: 5}}
                />
              </View>
              <View>
                <Arrows
                  name="chevron-right"
                  size={25}
                  color="black"
                  style={{fontWeight: '500'}}
                />
              </View>
            </TouchableOpacity>
            {MultiPageOptions.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.multiPages,
                  {
                    backgroundColor: item.backgroundColor,
                    width: listItemWidth,
                    marginTop: 10,
                  },
                ]}
                onPress={() => handlePress(item.onPress)}>
                <View style={{flex: 1}}>
                  <Text
                    style={{fontSize: 15, fontWeight: '500', color: 'black'}}>
                    {item.Option}
                  </Text>
                </View>
                <View>
                  <Arrows
                    name="chevron-right"
                    size={25}
                    color="black"
                    style={{fontWeight: '500'}}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    // fontFamily: 'ProximaNova-Regular',
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  bannerContainer: {
    backgroundColor: '#CCEFA7',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },

  feelingRange: {
    backgroundColor: '#D4F7E2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  question: {
    fontWeight: '700',
    fontSize: 20,
    color: 'black',
  },
  multipagesContainer: {
    marginVertical: 30,
  },
  seeNewOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 8,
    backgroundColor: '#D6F7F5',
    width: listItemWidth,
  },
  multiPages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 8,
  },
});
