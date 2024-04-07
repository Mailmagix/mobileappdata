import React, {useState, useRef} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import PlayIcon from 'react-native-vector-icons/MaterialIcons';
import PauseIcon from 'react-native-vector-icons/MaterialIcons';
import VolumeIcon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import HeadsetIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const formatTime = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${remainderSeconds
    .toString()
    .padStart(2, '0')}`;
};

const ListenOnTheGo = ({audioLink}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5); // Initial volume value

  const audioRef = useRef(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSliderValueChange = value => {
    setCurrentTime(value);
  };

  const handleVolumeChange = value => {
    setVolume(value);
  };

  const handleAudioLoad = data => {
    setDuration(data.duration);
  };

  const handleAudioProgress = data => {
    setCurrentTime(data.currentTime);
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    audioRef.current.seek(0);
  };

  const handleSlidingComplete = value => {
    setCurrentTime(value);
    audioRef.current.seek(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.headsetIcon}>
          <HeadsetIcon name="headphones" size={25} color="black" />
        </Text>
        <Text style={styles.listenText}>Listen on the Go</Text>
      </View>
      <View style={styles.audioContainer}>
        <TouchableOpacity onPress={handlePlayPause}>
          {isPlaying ? (
            <PauseIcon name="pause" size={30} color="black" />
          ) : (
            <PlayIcon name="play-arrow" size={30} color="black" />
          )}
        </TouchableOpacity>
        <Text style={styles.currentTime}>{formatTime(currentTime)}</Text>
        <Slider
          style={styles.slider}
          value={currentTime}
          minimumValue={0}
          maximumValue={duration}
          onValueChange={handleSliderValueChange}
          thumbTintColor="black"
          minimumTrackTintColor="black"
          maximumTrackTintColor="#414245"
          onSlidingComplete={handleSlidingComplete}
        />
        <Text style={styles.duration}>{formatTime(duration)}</Text>
        <VolumeIcon
          name="volume-down"
          size={24}
          color="black"
          style={styles.volumeIcon}
        />
        <Slider
          style={styles.volumeSlider}
          value={volume}
          minimumValue={0}
          maximumValue={1}
          onValueChange={handleVolumeChange}
          thumbTintColor="black"
          minimumTrackTintColor="black"
          maximumTrackTintColor="#414245"
        />
        <Video
          ref={audioRef}
          source={{uri: audioLink}}
          paused={!isPlaying}
          onLoad={handleAudioLoad}
          onProgress={handleAudioProgress}
          onEnd={handleAudioEnd}
          volume={volume}
        />
      </View>
    </View>
  );
};

export default ListenOnTheGo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fde9c7',
    padding: 10,
    borderRadius: 20,
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
  },
  currentTime: {
    minWidth: 40,
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
  },
  slider: {
    flex: 1,
    height: 20,
    borderRadius: 2,
    // marginHorizontal: 10,
  },
  duration: {
    minWidth: 40,
    fontSize: 12,
    textAlign: 'center',
    color: 'black',
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headsetIcon: {
    textAlign: 'center',
  },
  listenText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'black',
    textAlign: 'center',
  },
  volumeIcon: {
    marginHorizontal: 5,
  },
  volumeSlider: {
    flex: 1,
    marginHorizontal: 5,
  },
});
