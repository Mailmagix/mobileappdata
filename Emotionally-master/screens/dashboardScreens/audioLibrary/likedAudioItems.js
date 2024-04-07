import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeartIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {likeAudio} from '../../../store/actions/likedAudiosActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchLikedItem} from '../../../store/actions/likedItemsActions';

const LikedAudioItems = ({audio, navigation, onPress}) => {
  const [isAudioLiked, setIsAudioLiked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Define an async function to fetch the userId
    const fetchUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          setIsAudioLiked(audio.likes.includes(userId));
        }
      } catch (error) {
        console.error('Error fetching userId from AsyncStorage: ', error);
      }
    };

    // Call the async function to fetch the userId
    fetchUserId();
  }, [audio.likes]);

  const toggleAudioLike = () => {
    setIsAudioLiked(!isAudioLiked);
    dispatch(likeAudio(audio)); // Dispatch the likeAudio action when the like button is pressed
    setTimeout(() => {
      dispatch(fetchLikedItem());
    }, 1000);
  };

  const handleAudioPress = () => {
    // Navigate to the AudioPlayer screen with the selected audio
    onPress(audio);
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: 10,
          zIndex: 1,
        }}
        onPress={toggleAudioLike}>
        <HeartIcon
          name={isAudioLiked ? 'heart' : 'heart-outline'}
          size={24}
          color="red"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.audioWrapper, {backgroundColor: audio.backgroundColor}]}
        onPress={handleAudioPress}>
        <Text style={styles.title}>{audio.title}</Text>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: audio.image}}
            style={{
              height: 150,
              width: 100,
              alignSelf: 'center',
            }}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LikedAudioItems;

const styles = StyleSheet.create({
  audioWrapper: {
    width: 150,
    height: 220,
    borderRadius: 15,
    padding: 10,
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'left',
    paddingRight: 20,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
