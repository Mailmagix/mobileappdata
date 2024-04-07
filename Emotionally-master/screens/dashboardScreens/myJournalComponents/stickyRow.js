import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import BoldIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import UnderLineIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import StrikeThroughIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MicroPhoneIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageIcon from 'react-native-vector-icons/Octicons';
import CircleIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const StickyRow = ({handleBoldText}) => {
  return (
    <View style={styles.stickyRow}>
      <TouchableOpacity style={styles.iconContainer} onPress={handleBoldText}>
        <BoldIcon name="format-bold" size={25} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <UnderLineIcon name="format-underline" size={25} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <StrikeThroughIcon
          name="format-strikethrough-variant"
          size={20}
          color="black"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <MicroPhoneIcon name="microphone-outline" size={25} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <ImageIcon name="image" size={25} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <CircleIcon name="circle" size={25} color="#E9DBF9" />
      </TouchableOpacity>
    </View>
  );
};

export default StickyRow;

const styles = StyleSheet.create({
  stickyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 10,
    width: 250,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
