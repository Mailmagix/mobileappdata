import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Arrows from 'react-native-vector-icons/Feather';
import moment from 'moment';
import PinIcon from 'react-native-vector-icons/AntDesign';
import TrashIcon from 'react-native-vector-icons/Feather';
import ThreeDots from 'react-native-vector-icons/Feather';

const windowWidth = Dimensions.get('window').width;
const listItemWidth = windowWidth - 40; // Subtracting twice the marginHorizontal

const screenHeight = Dimensions.get('window').height;

const Notifications = ({navigation}) => {
  const currentDate = moment().format();

  const formatDate = timestamp => {
    const noteDate = moment(timestamp);
    const day = noteDate.format('DD');
    const monthYear = noteDate.format('MMM YYYY');

    return (
      <Text style={{color: 'black', fontSize: 12}}>
        <Text style={{fontSize: 20, fontWeight: '700'}}>{day}</Text> {monthYear}
      </Text>
    );
  };

  // Define a state variable to control the visibility of the options menu
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  const toggleOptionsMenu = () => {
    setShowOptionsMenu(!showOptionsMenu);
  };

  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.heading}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Arrows name="chevron-left" size={35} color="black" />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                fontSize: 25,
                color: 'black',
                fontWeight: '600',
              }}>
              Notifications
            </Text>
          </View>
          <View />
        </View>
        <View style={{marginVertical: 25, alignItems: 'center'}}>
          <TouchableOpacity style={styles.notificationsList}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'black',
                    fontWeight: '600',
                  }}>
                  A New Article is added
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'black',
                    fontWeight: '400',
                    textAlign: 'justify',
                    width: 175,
                  }}>
                  This Article is about meditations for good health.
                </Text>
              </View>
              <Text>{formatDate(currentDate)}</Text>

              <TouchableOpacity onPress={() => toggleOptionsMenu()}>
                <ThreeDots name="more-vertical" size={20} color="black" />
              </TouchableOpacity>
            </View>

            {/* Options menu */}
            {showOptionsMenu && (
              <View style={styles.optionsMenu}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}>
                  <PinIcon
                    name="pushpino"
                    size={15}
                    color="#FFE988"
                    style={{transform: [{rotate: '90deg'}]}}
                  />
                  <Text
                    style={{
                      color: '#FFE988',
                      marginLeft: 5,
                      fontSize: 12,
                      textAlign: 'left',
                    }}>
                    Pin
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    jjustifyContent: 'flex-start',
                    marginTop: 5,
                  }}>
                  <TrashIcon name="trash-2" size={15} color="#FFE988" />
                  <Text style={{color: '#FFE988', marginLeft: 5, fontSize: 12}}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 10,
    backgroundColor: 'white',
    minHeight: screenHeight,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 20,
  },
  notificationsList: {
    padding: 15,
    width: listItemWidth,
    borderRadius: 15,
    backgroundColor: '#FFE988',
  },
  optionsMenu: {
    position: 'absolute',
    top: 50,
    right: 15, // Adjust the right position as needed
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 1, // Ensure the menu is above other content
  },
});
