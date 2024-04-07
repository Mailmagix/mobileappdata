import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import SettingsOptions from './settingsOptions';
import Arrows from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {logout} from '../../../store/actions/authActions';

const windowWidth = Dimensions.get('window').width;
const listItemWidth = windowWidth - 40; // Subtracting twice the marginHorizontal

const Settings = ({navigation, showAccountDetails}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout(navigation));
  };

  const handlePress = action => {
    if (action === 'handleLogout') {
      handleLogout();
    } else if (action === 'showAccountDetails') {
      showAccountDetails();
    }
  };

  return (
    <View style={{marginVertical: 20}}>
      {SettingsOptions.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.settingsOption,
            {
              backgroundColor: item.backgroundColor,
              width: listItemWidth,
              marginTop: index === 0 ? 0 : 10,
            },
          ]}
          onPress={() => handlePress(item.onPress)}>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 14, fontWeight: '500', color: 'black'}}>
              {item.Option}
            </Text>
          </View>
          <View>
            <Arrows
              name="chevron-right"
              size={25}
              color="black"
              style={{fontWeight: 'bold'}}
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  settingsOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 5,
    paddingLeft: 15,
    paddingRight: 8,
  },
});
