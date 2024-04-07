import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CloseIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Arrows from 'react-native-vector-icons/MaterialCommunityIcons';
import VideoLibraryItem from './dashboardScreens/videoLibrary/videoLibraryItem';
import {loadUserSession} from '../store/actions/sessionStorageActions';
import {fetchAudios} from '../store/actions/audioActions';
import AudioPlayer from './dashboardScreens/audioLibrary/audioPLayer';
import {fetchArticles} from '../store/actions/articleLibraryActions';
import ReadArticlePage from './dashboardScreens/articleLibrary/readArticlePage';

const windowWidth = Dimensions.get('window').width;
const listItemWidth = windowWidth - 40; // Subtracting twice the marginHorizontal

const SearchContents = ({setSearchDataVisible, keyword}) => {
  const [currentPage, setCurrentPage] = useState('SearchContent');
  const {audios} = useSelector(state => state.audios) || [];

  const Articles = useSelector(state => state.articles.articles) || [];

  const dispatch = useDispatch();

  // State to store the selected audio
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);

  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showReadArticle, setShowReadArticle] = useState(false);

  const handleAudioPLayer = item => {
    setSelectedAudio(item);
    // Toggle the showContent state to display the AudioPlayer component
    setShowAudioPlayer(true);
  };

  // Callback function to show the ReadArticlePage
  const showReadArticlePage = article => {
    setSelectedArticle(article);
    setShowReadArticle(true);
  };

  const colors = [
    '#D6F7F5',
    '#D4F7E2',
    '#FFDABC',
    '#FFF3BD',
    '#E9DBF9',
    '#F6D4E6',
    '#E5F7D0',
    '#D6F7F5',
    '#D4F7E2',
  ];

  const categories = audios.reduce((uniqueCategories, audio) => {
    if (!uniqueCategories.includes(audio.category)) {
      uniqueCategories.push(audio.category);
    }
    return uniqueCategories;
  }, []);

  const VisibilityChange = () => {
    setCurrentPage('SearchContent');
  };

  useEffect(() => {
    // Dispatch the action to load user session (if needed)
    dispatch(loadUserSession())
      .then(() => {
        // After user session is loaded, you can dispatch your fetch actions
        dispatch(fetchAudios());
        dispatch(fetchArticles());
      })
      .catch(error => {
        // Handle any errors related to loading user session
        console.error('Error loading user session:', error);
      });
  }, [dispatch]);

  const {data} = useSelector(state => state.search); // Access search data from the Redux store

  // Function to render data inside the modal or a message if there is no data
  const renderSearchModalContent = () => {
    if (data && Object.keys(data).length > 0) {
      return (
        <ScrollView>
          {/* Render audio titles */}
          {data.audios && data.audios.length > 0 && (
            <View style={{marginVertical: 10}}>
              <Text style={styles.modalTitle}>Audio:</Text>
              {data.audios.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.options,
                    {
                      backgroundColor: item.backgroundColor,
                      width: listItemWidth,
                      marginTop: 10,
                    },
                  ]}
                  onPress={() => handleAudioPLayer(item)}>
                  <View style={{flex: 1}}>
                    <Text
                      style={{fontSize: 15, fontWeight: '500', color: 'black'}}>
                      {item.title}
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
          )}

          {/* Render video titles */}
          {data.videos && data.videos.length > 0 && (
            <View style={{marginVertical: 10}}>
              <Text style={styles.modalTitle}>Video:</Text>
              {data.videos.map((item, index) => (
                <VideoLibraryItem key={index} video={item} index={index} />
              ))}
            </View>
          )}

          {/* Render articles titles */}
          {data.articles && data.articles.length > 0 && (
            <View style={{marginVertical: 10}}>
              <Text style={styles.modalTitle}>Articles:</Text>
              {data.articles.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.options,
                    {
                      backgroundColor: item.backgroundColor,
                      width: listItemWidth,
                      marginTop: 10,
                    },
                  ]}
                  onPress={() => showReadArticlePage(item)}>
                  <View style={{flex: 1}}>
                    <Text
                      style={{fontSize: 15, fontWeight: '500', color: 'black'}}>
                      {item.title}
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
          )}
        </ScrollView>
      );
    } else {
      // Display a message when there is no data
      return (
        <View style={{marginVertical: 30}}>
          <Text style={styles.noDataText}>No data available</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.modalContainer}>
      {showAudioPlayer && selectedAudio ? (
        <ScrollView>
          <AudioPlayer
            audio={selectedAudio}
            audios={audios}
            categories={categories} // Pass the categories array to the AudioPlayer component
            setShowAudioPlayer={setShowAudioPlayer} // Pass the setter function to update showContent
            onAudioPlayerVisibilityChange={VisibilityChange}
          />
        </ScrollView>
      ) : showReadArticle ? (
        <ScrollView>
          <ReadArticlePage
            article={selectedArticle}
            setShowReadArticle={setShowReadArticle}
            onReadArticleVisibilityChange={VisibilityChange}
          />
        </ScrollView>
      ) : (
        <View style={{paddingTop: 20, paddingBottom: 50}}>
          <TouchableOpacity
            onPress={() => {
              console.log('Closing modal...');
              setSearchDataVisible(false);
            }}>
            <CloseIcon
              name="close-circle-outline"
              size={30}
              color="black"
              style={{textAlign: 'right', paddingHorizontal: 20}}
            />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                color: 'blue',
                fontSize: 15,
                marginHorizontal: 20,
                marginBottom: 10,
              }}>
              Search Keyword : <Text style={{color: 'black'}}>{keyword}</Text>
            </Text>
          </View>

          {renderSearchModalContent()}
        </View>
      )}
    </View>
  );
};

export default SearchContents;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    paddingHorizontal: 20,
  },
  modalItem: {
    color: 'black',
    fontSize: 15,
    paddingHorizontal: 20,
  },
  noDataText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: 'black',
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
