import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Arrows from 'react-native-vector-icons/MaterialCommunityIcons';
import Articles from './articles';
import Videos from './videos';
import Audios from './audios';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMedia} from '../../../store/actions/topicsLibraryActions';

const windowWidth = Dimensions.get('window').width;
const listItemWidth = windowWidth - 40; // Subtracting twice the marginHorizontal

const LifeTopicTitles = ({handleBack, topic, category}) => {
  const [currentPage, setCurrentPage] = useState('LifeTopicTitles');

  const dispatch = useDispatch();

  const topicMedia = useSelector(state => state.topics.media);

  const colors = [
    '#D4F7E2',
    '#FFDABC',
    '#FFF3BD',
    '#E9DBF9',
    '#F6D4E6',
    '#E5F7D0',
    '#D6F7F5',
    '#D4F7E2',
    '#FFDABC',
  ];

  useEffect(() => {
    const backAction = () => {
      if (currentPage === 'Articles') {
        setCurrentPage('LifeTopicTitles');
        return true; // This will prevent the app from closing
      } else if (currentPage === 'Videos') {
        setCurrentPage('LifeTopicTitles');
        return true; // This will prevent the app from closing
      } else if (currentPage === 'Audios') {
        setCurrentPage('LifeTopicTitles');
        return true; // This will prevent the app from closing
      }
      return false; // This will use the default back button behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [currentPage]);

  const handleBackPage = () => {
    if (currentPage === 'Videos') {
      setCurrentPage('LifeTopicTitles');
      return true;
    }
    if (currentPage === 'Articles') {
      setCurrentPage('LifeTopicTitles');
      return true;
    }
    if (currentPage === 'Audios') {
      setCurrentPage('LifeTopicTitles');
      return true;
    }
    return false;
  };

  const handlePress = action => {
    if (action === 'Articles') {
      setCurrentPage('Articles');
    } else if (action === 'Videos') {
      setCurrentPage('Videos');
    } else if (action === 'Audios') {
      setCurrentPage('Audios');
    } else {
      setCurrentPage('LifeTopicTitles');
    }
  };

  // Extract the specific media types
  const articles = topicMedia['Articles'] || [];
  const videos = topicMedia['Videos'] || [];
  const audios = topicMedia['Audios'] || [];

  useEffect(() => {
    if (topic && category) {
      dispatch(fetchMedia(topic, category));
    }
  }, [dispatch, topic, category]); // Add dependencies here

  // Render based on the current page
  switch (currentPage) {
    case 'Articles':
      return <Articles handleBack={handleBackPage} articles={articles} />;
    case 'Videos':
      return <Videos handleBack={handleBackPage} videos={videos} />;
    case 'Audios':
      return <Audios handleBack={handleBackPage} audios={audios} />;
    default:
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
          <Text style={{color: 'black', fontSize: 20, textAlign: 'center'}}>
            {topic}
          </Text>
          <View style={styles.optionsContainer}>
            {Object.keys(topicMedia).map((key, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.options,
                  {
                    backgroundColor: colors[index % colors.length],
                    width: listItemWidth,
                    marginTop: 10,
                  },
                ]}
                onPress={() => handlePress(key)}>
                <View style={{flex: 1}}>
                  <Text
                    style={{fontSize: 15, fontWeight: '500', color: 'black'}}>
                    {key}
                  </Text>
                </View>
                <Arrows name="chevron-right" size={25} color="black" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
  }
};

export default LifeTopicTitles;

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
  backButtonText: {
    color: 'blue',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
