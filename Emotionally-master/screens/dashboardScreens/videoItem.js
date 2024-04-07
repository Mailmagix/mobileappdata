import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import Video from 'react-native-video';
import HeartIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FullScreenIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Orientation from 'react-native-orientation-locker';
import * as Progress from 'react-native-progress'; // Corrected import

const VideoItem = ({video, index, totalItems}) => {
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isVideoLiked, setIsVideoLiked] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0); // Use state instead of ref
  const [timeLeft, setTimeLeft] = useState(0); // Use state instead of ref
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleVideoPlay = () => {
    setIsPaused(!isPaused);
  };

  const toggleVideoLike = () => {
    setIsVideoLiked(!isVideoLiked);
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

  const handleVideoEnd = () => {
    // Set the video to paused when it ends and show the play icon
    setIsPaused(true);
    // videoRef.current.seek(0);
  };

  const handleVideoLoad = data => {
    setVideoDuration(data.duration);
    timeLeft.current = data.duration - currentTime.current;
  };

  const handleVideoProgress = data => {
    setCurrentTime(data.currentTime); // Update state instead of ref
    setTimeLeft(videoDuration - data.currentTime); // Update state instead of ref
  };

  const calculateTimeLeft = () => {
    if (videoDuration === 0) {
      return 'Calculating...';
    }

    const totalSecondsLeft = Math.max(videoDuration - currentTime, 0);
    const hours = Math.floor(totalSecondsLeft / 3600);
    const minutes = Math.floor((totalSecondsLeft % 3600) / 60);
    const seconds = Math.floor(totalSecondsLeft % 60);

    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} left`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} left`;
    } else {
      return `${seconds} second${seconds !== 1 ? 's' : ''} left`;
    }
  };

  const getProgress = () => {
    // Use the state values instead of ref.current
    if (videoDuration > 0) {
      return currentTime / videoDuration;
    } else {
      return 0;
    }
  };

  return (
    <View
      style={{
        width: 280,
        height: 250,
        marginLeft: index === 0 ? 20 : 15,
        marginRight: index === totalItems - 1 ? 20 : 0,
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
            style={[
              styles.videoWrapper,
              {height: isFullScreen ? '100%' : '70%'},
            ]}
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
              onEnd={handleVideoEnd} // Call the function when the video ends
              onLoad={handleVideoLoad} // Add the onLoad prop to get the video duration
              onProgress={handleVideoProgress}
            />
            {!isFullScreen && (
              <TouchableOpacity
                style={styles.fullScreenButton}
                onPress={toggleFullScreen}>
                <FullScreenIcon name="fullscreen" size={30} color="white" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,
              marginBottom: 10,
              fontSize: 20,
              color: 'black',
              fontWeight: 700,
            }}>
            {video.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              parginBottom: 20,
            }}>
            <View>
              <Progress.Bar
                progress={getProgress()}
                width={100}
                height={10}
                color="#FF8E4F"
                unfilledColor="#FFCFA8"
                borderRadius={20}
                borderWidth={0}
              />
              <View>
                <Text style={styles.text1}>{calculateTimeLeft()}</Text>
              </View>
            </View>
            <View style={{ustifyContent: 'center'}}>
              <Text style={styles.text2}>{video.text2}</Text>
            </View>
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
            onEnd={handleVideoEnd}
            onLoad={handleVideoLoad}
            onProgress={handleVideoProgress}
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

export default VideoItem;

const styles = StyleSheet.create({
  videoWrapper: {
    width: '100%',
    position: 'relative', // to allow absolutely positioning the play button inside this view
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
  text2: {
    color: 'black',
    letterSpacing: 2,
    backgroundColor: '#63D9A0',
    borderRadius: 26,
    padding: 3,
    fontSize: 12,
  },
  text1: {
    color: 'black',
  },
});
