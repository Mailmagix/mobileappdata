import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Arrows from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  removeLastBreadcrumb,
  setBreadcrumb,
} from '../../../../../store/actions/breadcrumbActions';
import {useDispatch} from 'react-redux';
import FitnessOptionsArray from '../fitnessOptionsArray';

const windowWidth = Dimensions.get('window').width;
const listItemWidth = windowWidth - 40; // Subtracting twice the marginHorizontal

const Crossfit = () => {
  return (
    <View style={styles.optionsContainer}>
      {FitnessOptionsArray.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.lonelinessOptions,
            {
              backgroundColor: item.backgroundColor,
              width: listItemWidth,
              marginTop: 10,
            },
          ]}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 15, fontWeight: '500', color: 'black'}}>
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
  );
};

export default Crossfit;

const styles = StyleSheet.create({
  optionsContainer: {
    marginBottom: 60,
  },
  lonelinessOptions: {
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
