import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Arrows from 'react-native-vector-icons/Feather';
import Search from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {fetchLikedItem} from '../../store/actions/likedItemsActions';
import AudioPlayer from './audioLibrary/audioPLayer';
import LikedAudioItems from './audioLibrary/likedAudioItems';
import LikedVideoItems from './videoLibrary/likedVideoItems';
import ReadArticlePage from './articleLibrary/readArticlePage';
import LikedArticlesItems from './articleLibrary/likedArticlesItems';

const windowWidth = Dimensions.get('window').width;
const listItemWidth = windowWidth - 40; // Subtracting twice the marginHorizontal

const screenHeight = Dimensions.get('window').height;

const LikedItems = ({navigation, route}) => {
  const [selectedTab, setSelectedTab] = useState('Audios'); // default tab

  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  // Retrieving state from the Redux store
  const {audios, videos, articles, loading, error} = useSelector(
    state => state.likedItems,
  );

  const Audios = useSelector(state => state.audios.audios) || [];

  const categories = Audios.reduce((uniqueCategories, audio) => {
    if (!uniqueCategories.includes(audio.category)) {
      uniqueCategories.push(audio.category);
    }
    return uniqueCategories;
  }, []);

  // State to store the selected audio
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);

  useEffect(() => {
    dispatch(fetchLikedItem());
  }, [dispatch]);

  const handleAudioPlayer = audio => {
    setSelectedAudio(audio);
    // Toggle the showContent state to display the AudioPlayer component
    setShowAudioPlayer(true);
    // Implement or call your audio player handler here
  };

  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showReadArticle, setShowReadArticle] = useState(false);

  // Callback function to show the ReadArticlePage
  const showReadArticlePage = article => {
    setSelectedArticle(article);
    setShowReadArticle(true);
  };

  const VisibilityChange = () => {
    setShowAudioPlayer(false);
    setShowReadArticle(false);
    dispatch(fetchLikedItem());
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Render function for empty content message
  const renderEmptyItemMessage = contentType => (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
      <Text style={{fontSize: 15, textAlign: 'center', color: 'black'}}>
        {`You don't have any liked ${contentType} yet.`}
      </Text>
    </View>
  );

  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {showAudioPlayer && selectedAudio && !showReadArticle ? (
          <AudioPlayer
            navigation={navigation}
            audio={selectedAudio}
            audios={Audios}
            categories={categories} // Pass the categories array to the AudioPlayer component
            setShowAudioPlayer={setShowAudioPlayer} // Pass the setter function to update showContent
            onAudioPlayerVisibilityChange={VisibilityChange}
          />
        ) : !showAudioPlayer && showReadArticle ? (
          // Display the ReadArticlePage component if showContent is false and showReadArticle is true
          <ReadArticlePage
            article={selectedArticle}
            setShowReadArticle={setShowReadArticle}
            onReadArticleVisibilityChange={VisibilityChange}
          />
        ) : (
          <View>
            <View style={styles.heading}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Arrows name="chevron-left" size={35} color="black" />
              </TouchableOpacity>
              <View>
                <Text
                  style={{
                    fontSize: 25,
                    color: 'black',
                    fontWeight: '600',
                  }}>
                  Likes
                </Text>
              </View>
              <Search
                name="magnify"
                size={35}
                color="black"
                style={{fontWeight: 'bold'}}
              />
            </View>

            {/* Tab buttons */}
            <View style={styles.tabsContainer}>
              {['Audios', 'Videos', 'Articles'].map(tab => (
                <TouchableOpacity
                  style={styles.tabItem} // <- Wrap each tab with a style (if you need specific styling for the touchable component)
                  onPress={() => setSelectedTab(tab)}
                  key={tab} // <- Don't forget keys for array elements
                >
                  <Text
                    style={[
                      styles.tabText, // <- General text styling
                      selectedTab === tab && styles.activeTab, // <- Active tab text styling
                    ]}>
                    {tab}
                  </Text>
                  {selectedTab === tab && (
                    <View style={styles.activeIndicator} />
                  )}
                  {/* <- Active tab underline */}
                </TouchableOpacity>
              ))}
            </View>

            {/* Content based on selected tab */}
            {loading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : error ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>Error fetching data. Please try again.</Text>
              </View>
            ) : (
              <View style={{marginHorizontal: 20}}>
                {selectedTab === 'Audios' &&
                  (audios.length === 0 ? (
                    renderEmptyItemMessage('audios') // 'audios' will be used to display the custom message for empty audios list
                  ) : (
                    <View style={styles.audioItemsContainer}>
                      {audios.map((audio, index) => (
                        <View style={styles.audioItem} key={index}>
                          <LikedAudioItems
                            audio={audio}
                            audios={audios}
                            navigation={navigation}
                            onPress={() => handleAudioPlayer(audio)}
                          />
                        </View>
                      ))}
                    </View>
                  ))}
                {selectedTab === 'Videos' &&
                  (videos.length === 0 ? (
                    renderEmptyItemMessage('videos')
                  ) : (
                    <View style={styles.videoItemsContainer}>
                      {videos.map((video, index) => (
                        <View style={styles.videoItem} key={index}>
                          <LikedVideoItems video={video} />
                        </View>
                      ))}
                    </View>
                  ))}
                {selectedTab === 'Articles' &&
                  (articles.length === 0 ? (
                    renderEmptyItemMessage('articles')
                  ) : (
                    <View style={styles.articleItemsContainer}>
                      {articles.map((article, index) => (
                        <View style={styles.articleItem} key={index}>
                          <LikedArticlesItems
                            key={index}
                            article={article}
                            showReadArticlePage={() =>
                              showReadArticlePage(article)
                            } // Pass the article object here
                            index={index}
                            totalItems={articles.length}
                          />
                        </View>
                      ))}
                    </View>
                  ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default LikedItems;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 10,
    backgroundColor: 'white',
    minHeight: screenHeight,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingVertical: 15,
    width: listItemWidth,
    alignSelf: 'center',
  },
  tabItem: {
    // <- Style for the touchable component if needed
    alignItems: 'center', // <- Align label and indicator
  },
  tabText: {
    fontSize: 18,
    color: 'black',
    paddingHorizontal: 5,
  },
  activeTab: {
    fontWeight: 'bold',
    color: 'black',
  },
  activeIndicator: {
    // <- This represents your active underline
    height: 2, // <- Thickness of the line
    backgroundColor: 'black',
    alignSelf: 'stretch',
    marginTop: 5,
  },
  audioItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // ensures space between two items in the same row
  },
  audioItem: {
    // width: '48%', // slightly less than half the space to accommodate margins/padding
    marginBottom: 10, // space between rows
  },
  videoItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // ensures space between two items in the same row
  },
  videoItem: {
    marginBottom: 10,
  },
  articleItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  articleItem: {
    marginBottom: 10,
  },
});
