import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AudioPlayer from '../audioLibrary/audioPLayer';
import {fetchAudios} from '../../../store/actions/audioActions';
import {useDispatch, useSelector} from 'react-redux';
import {loadUserSession} from '../../../store/actions/sessionStorageActions';
import Arrows from 'react-native-vector-icons/MaterialCommunityIcons';

const windowWidth = Dimensions.get('window').width;
const listItemWidth = windowWidth - 40; // Subtracting twice the marginHorizontal

const Audios = ({handleBack, audios}) => {
  const [currentPage, setCurrentPage] = useState('Audios');
  const Audios = useSelector(state => state.audios.audios) || [];

  const dispatch = useDispatch();

  // State to store the selected audio
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);

  const handleAudioPLayer = audio => {
    setSelectedAudio(audio);
    // Toggle the showContent state to display the AudioPlayer component
    setShowAudioPlayer(true);
  };

  const categories = Audios.reduce((uniqueCategories, audio) => {
    if (!uniqueCategories.includes(audio.category)) {
      uniqueCategories.push(audio.category);
    }
    return uniqueCategories;
  }, []);

  const VisibilityChange = () => {
    setCurrentPage('Audios');
  };

  useEffect(() => {
    // Dispatch the action to load user session (if needed)
    dispatch(loadUserSession())
      .then(() => {
        // After user session is loaded, you can dispatch your fetch actions
        dispatch(fetchAudios());
      })
      .catch(error => {
        // Handle any errors related to loading user session
        console.error('Error loading user session:', error);
      });
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {showAudioPlayer && selectedAudio ? (
        <AudioPlayer
          audio={selectedAudio}
          audios={Audios}
          categories={categories} // Pass the categories array to the AudioPlayer component
          setShowAudioPlayer={setShowAudioPlayer} // Pass the setter function to update showContent
          onAudioPlayerVisibilityChange={VisibilityChange}
        />
      ) : (
        <View>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text
              style={{
                color: 'blue',
                fontSize: 14,
                fontWeight: '500',
                textDecorationLine: 'underline',
              }}>
              Go Back
            </Text>
          </TouchableOpacity>
          <Text style={{color: 'black', fontSize: 20, textAlign: 'center'}}>
            Audios
          </Text>
          <View style={styles.optionsContainer}>
            {audios.map((audio, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.options,
                  {
                    backgroundColor: audio.backgroundColor,
                    width: listItemWidth,
                    marginTop: 10,
                  },
                ]}
                onPress={() => handleAudioPLayer(audio)}>
                <View style={{flex: 1}}>
                  <Text
                    style={{fontSize: 15, fontWeight: '500', color: 'black'}}>
                    {audio.title}
                  </Text>
                </View>
                <View>
                  <Arrows
                    name="chevron-right"
                    size={25}
                    color="black"
                    style={{fontWeight: '500'}}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default Audios;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  optionsContainer: {
    marginTop: 10,
    marginBottom: 50,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 8,
  },
});
