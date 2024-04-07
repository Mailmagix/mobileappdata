import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import HeartIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FullScreenIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Orientation from 'react-native-orientation-locker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {likeVideo} from '../../../store/actions/likedVideosActions';

const windowWidth = Dimensions.get('window').width;
const listItemWidth = windowWidth - 40; // Subtracting twice the marginHorizontal

const TalksItems = ({video, index}) => {
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isVideoLiked, setIsVideoLiked] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();

  const toggleVideoPlay = () => {
    setIsPaused(!isPaused);
  };

  useEffect(() => {
    // Define an async function to fetch the userId
    const fetchUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          setIsVideoLiked(video.likes.includes(userId));
        }
      } catch (error) {
        console.error('Error fetching userId from AsyncStorage: ', error);
      }
    };

    // Call the async function to fetch the userId
    fetchUserId();
  }, [video.likes]);

  const toggleVideoLike = () => {
    setIsVideoLiked(!isVideoLiked);
    dispatch(likeVideo(video)); // Dispatch the likeVideo action when the like button is pressed
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    setIsModalVisible(!isModalVisible); // Show or hide modal
    if (isFullScreen) {
      Orientation.lockToPortrait();
    } else {
      Orientation.lockToLandscape();
    }
  };

  return (
    <View
      style={{
        width: listItemWidth,
        marginTop: index === 0 ? 0 : 20,
      }}>
      {!isFullScreen && (
        <View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: 10,
              zIndex: 1,
            }}
            onPress={toggleVideoLike}>
            <HeartIcon
              name={isVideoLiked ? 'heart' : 'heart-outline'}
              size={24}
              color="red"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.videoWrapper, {height: isFullScreen ? '100%' : 180}]}
            onPress={toggleVideoPlay}>
            <Video
              ref={videoRef}
              source={{uri: video.uri}}
              style={{width: '100%', height: '100%', borderRadius: 15}}
              resizeMode="cover"
              paused={isPaused}
              repeat={false}
              controls
              controlTimeout={5000} // Set the timeout for hiding controls to 5 seconds
              controlStyle={{opacity: isFullScreen ? 1 : 0}} // Make the controls transparent when not in fullscreen
              disableFullscreen={true}
              disableBack
              fullscreen={isFullScreen}
            />
            {!isFullScreen && (
              <TouchableOpacity
                style={styles.fullScreenButton}
                onPress={toggleFullScreen}>
                <FullScreenIcon name="fullscreen" size={30} color="white" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              marginTop: 10,
            }}>
            <Text
              style={{
                marginBottom: 10,
                fontSize: 20,
                color: 'black',
                fontWeight: 700,
              }}>
              {video.title}
            </Text>
            <Text style={styles.text1}>{video.text}</Text>
          </View>
        </View>
      )}
      <Modal
        visible={isModalVisible}
        supportedOrientations={['landscape']}
        onRequestClose={() => setIsModalVisible(false)}
        transparent
        style={{
          backgroundColor: 'transparent',
          position: 'relative',
          width: '100%',
          height: '100%',
        }}>
        <TouchableOpacity style={styles.videoWrapper} onPress={toggleVideoPlay}>
          <Video
            ref={videoRef}
            source={{uri: video.uri}}
            style={{width: '100%', height: '100%'}}
            resizeMode="cover"
            paused={isPaused}
            repeat={false}
            controls
          />
          {isFullScreen && (
            <TouchableOpacity
              style={styles.exitFullScreenButton}
              onPress={toggleFullScreen}>
              <FullScreenIcon name="fullscreen-exit" size={30} color="white" />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default TalksItems;

const styles = StyleSheet.create({
  videoWrapper: {
    width: '100%',
    borderRadius: 15,
  },
  fullScreenButton: {
    position: 'absolute',
    top: 5,
    left: 10,
    padding: 10,
    zIndex: 1,
  },
  exitFullScreenButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    zIndex: 1,
  },
  text1: {
    color: 'black',
    letterSpacing: 2,
    backgroundColor: '#63D9A0',
    borderRadius: 26,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 12,
  },
});
