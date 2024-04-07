import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Video from 'react-native-video';
import CloseIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const windowWidth = Dimensions.get('window').width;
const remainingAudioContainerWidth = windowWidth - 40; // Subtracting twice the marginHorizontal

const AudioPlayer = ({
  audio,
  audios,
  categories,
  setShowAudioPlayer,
  onAudioPlayerVisibilityChange,
}) => {
  const audioPlayerRef = useRef(null);

  const [currentAudio, setCurrentAudio] = useState(audio);
  const [selectedCategory, setSelectedCategory] = useState('All Audios');

  useEffect(() => {
    // If audio changes (when the user selects a different audio from the list),
    // update the currentAudio state to reflect the change
    setCurrentAudio(audio);
  }, [audio]);

  const handleAudioPress = audio => {
    // When a different audio item is pressed from the list, update the currentAudio state
    setCurrentAudio(audio);
  };

  const handleAudioEnd = () => {
    // When the audio finishes playing, play the next audio in the list
    const currentIndex = audios.findIndex(
      audio => audio.id === currentAudio.id,
    );
    const nextIndex = (currentIndex + 1) % audios.length;
    setCurrentAudio(audios[nextIndex]);
  };

  const handleGoBack = () => {
    onAudioPlayerVisibilityChange(true);
    // navigation.goBack();
    setShowAudioPlayer(false);
  };

  const handleCategoryChange = category => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    setCurrentAudio(audio);
  }, [audio]);

  const filteredAudios =
    selectedCategory === 'All Audios'
      ? audios
      : audios.filter(audio => audio.category === selectedCategory);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.closeIcon}>
        <CloseIcon
          name="close-circle-outline"
          size={30}
          color="black"
          style={{textAlign: 'right', paddingHorizontal: 20}}
        />
      </TouchableOpacity>
      {/* Display the audio title and image */}
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>{currentAudio.title}</Text>
        {currentAudio && currentAudio.image && (
          <Image
            source={{uri: currentAudio.image}}
            style={styles.image}
            resizeMode="contain"
          />
        )}

        {/* Audio Player */}
        <Video
          ref={audioPlayerRef}
          source={{uri: currentAudio.audioUrl}}
          paused={true} // Set 'true' to pause audio initially, 'false' to play
          controls={true} // Show audio player controls (play/pause/seek)
          style={styles.audioPlayer}
          onEnd={handleAudioEnd}
        />
      </View>
      {/* Options View */}
      <View style={styles.card}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={handleCategoryChange.bind(null, 'All Audios')}>
            <Text style={styles.optionButtonText}>All Audios</Text>
            {/* Horizontal black line for active option */}
            {selectedCategory === 'All Audios' && (
              <View style={styles.activeLine} />
            )}
          </TouchableOpacity>
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={styles.optionButton}
              onPress={handleCategoryChange.bind(null, category)}>
              <Text style={styles.optionButtonText}>{category}</Text>
              {/* Horizontal black line for active option */}
              {selectedCategory === category && (
                <View style={styles.activeLine} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Light gray horizontal line */}
        <View style={styles.horizontalLine} />

        {/* Display the list of remaining audios */}
        <View style={styles.remainingAudiosContainer}>
          {filteredAudios.map((audio, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.audioListItem,
                {backgroundColor: audio.backgroundColor},
              ]}
              onPress={() => handleAudioPress(audio)}>
              <Text style={styles.audioItemTitle}>{audio.title}</Text>
              <Image
                source={{uri: audio.image}}
                style={styles.audioItemImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default AudioPlayer;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  audioPlayer: {
    width: remainingAudioContainerWidth,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: 'black',
    fontSize: 25,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  optionButton: {
    marginRight: 10,
    marginLeft: 20,
    paddingLeft: 3,
    paddingRight: 3,
  },
  activeLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'black',
    borderRadius: 25,
  },
  optionButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
    paddingTop: 20,
    paddingBottom: 15,
  },
  card: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 0,
    borderColor: '#000000',
    backgroundColor: '#D4F7E2',
    margin: 5,
  },
  remainingAudiosContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  audioListItem: {
    width: remainingAudioContainerWidth,
    borderRadius: 15,
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  audioItemImage: {
    height: 80,
    width: 80,
    alignSelf: 'center',
  },
  audioItemTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },
  horizontalLine: {
    height: 1,
    width: '100%',
    backgroundColor: 'gray', // Light gray color for the horizontal line
  },
});
