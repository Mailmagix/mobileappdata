import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import PlayIcon from 'react-native-vector-icons/MaterialIcons';
import PauseIcon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import DeleteIcon from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';

const formatTime = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')} : ${remainderSeconds
    .toString()
    .padStart(2, '0')}`;
};

const AudioListItem = ({audio, index, onStartPlay, onDelete}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audio.path !== null && isPlaying) {
      // Start playing audio
      audioRef.current.seek(currentTime);
    }
  }, [isPlaying]);

  const audioRef = React.useRef(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    onStartPlay(index);
  };

  const handleSliderValueChange = value => {
    setCurrentTime(value);
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

  const handleDelete = () => {
    onDelete(index);
  };

  return (
    <View style={styles.audioItem}>
      <TouchableOpacity onPress={handlePlayPause}>
        {isPlaying ? (
          <PauseIcon name="pause" size={20} color="black" />
        ) : (
          <PlayIcon name="play-arrow" size={20} color="black" />
        )}
      </TouchableOpacity>
      <Text style={styles.audioInfo}>
        {formatTime(currentTime)} / {formatTime(duration)}
      </Text>
      <Slider
        style={styles.audioSlider}
        value={currentTime}
        minimumValue={0}
        maximumValue={duration}
        minimumTrackTintColor="black"
        maximumTrackTintColor="#414245"
        onValueChange={handleSliderValueChange}
        onSlidingComplete={handleSlidingComplete}
      />
      <TouchableOpacity onPress={handleDelete}>
        <DeleteIcon name="delete" size={20} color="black" />
      </TouchableOpacity>
      <Video
        ref={audioRef}
        source={{uri: audio.path}}
        paused={!isPlaying}
        onLoad={handleAudioLoad}
        onProgress={handleAudioProgress}
        onEnd={handleAudioEnd}
        style={styles.audioPlayer}
      />
    </View>
  );
};

export default AudioListItem;

const styles = StyleSheet.create({
  audioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFE988',
    borderRadius: 10,
  },
  audioInfo: {
    fontSize: 14,
    color: 'black',
    marginLeft: 10,
  },
  audioSlider: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  audioPlayer: {
    width: 0, // Set the width to 0 to hide the video player
    height: 0, // Set the height to 0 to hide the video player
  },
});
