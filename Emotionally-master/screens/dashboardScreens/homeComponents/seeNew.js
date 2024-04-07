import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import Arrows from 'react-native-vector-icons/MaterialCommunityIcons';
import SeeNewOptions from './seeNewOptions';

const windowWidth = Dimensions.get('window').width;
const listItemWidth = windowWidth - 40; // Subtracting twice the marginHorizontal

const SeeNew = () => {
  return (
    <View style={styles.optionsContainer}>
      {SeeNewOptions.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.seeNewOptions,
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

export default SeeNew;

const styles = StyleSheet.create({
  optionsContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  seeNewOptions: {
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
