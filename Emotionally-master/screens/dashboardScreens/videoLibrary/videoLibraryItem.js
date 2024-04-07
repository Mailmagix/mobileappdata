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
import SmallDotIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {likeVideo} from '../../../store/actions/likedVideosActions';

const windowWidth = Dimensions.get('window').width;
const listItemWidth = windowWidth - 40; // Subtracting twice the marginHorizontal

const VideoLibraryItem = ({video, index}) => {
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isVideoLiked, setIsVideoLiked] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [duration, setDuration] = useState(null);

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

  const formatDuration = totalSeconds => {
    if (totalSeconds >= 3600) {
      const hours = Math.floor(totalSeconds / 3600);
      return hours + ' hour' + (hours > 1 ? 's' : '');
    } else if (totalSeconds >= 60) {
      const minutes = Math.floor(totalSeconds / 60);
      return minutes + ' min' + (minutes > 1 ? 's' : '');
    } else {
      return totalSeconds + ' sec' + (totalSeconds > 1 ? 's' : '');
    }
  };

  const handleLoad = meta => {
    setDuration(Math.round(meta.duration)); // Save the duration in seconds when the video loads
  };

  return (
    <View
      style={{
        width: listItemWidth,
        alignSelf: 'center',
        marginVertical: index === 0 ? 20 : 15,
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
              onLoad={handleLoad}
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
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={styles.text1}>{video.text}</Text>
            {duration !== null && (
              <View style={styles.duration}>
                <Text style={styles.text}>Video</Text>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <SmallDotIcon name={'circle-small'} size={25} color="black" />
                </View>
                <Text style={styles.text}>{formatDuration(duration)}</Text>
              </View>
            )}
            <Text
              style={{
                marginTop: 10,
                marginBottom: 10,
                fontSize: 20,
                color: 'black',
                fontWeight: 700,
                textAlign: 'center',
              }}>
              {video.title}
            </Text>
            <Text style={styles.text2}>{video.description}</Text>
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

export default VideoLibraryItem;

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
    padding: 4,
    fontSize: 12,
  },
  text2: {
    textAlign: 'center',
    color: 'black',
  },
  duration: {
    marginTop: 5,
    color: 'black',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
});
