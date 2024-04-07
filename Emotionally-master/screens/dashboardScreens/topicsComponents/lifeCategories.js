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
import {
  removeLastBreadcrumb,
  setBreadcrumb,
} from '../../../store/actions/breadcrumbActions';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchCategoryTopics,
  fetchMedia,
} from '../../../store/actions/topicsLibraryActions';
import LifeTopicTitles from './lifeTopicTitles';

const windowWidth = Dimensions.get('window').width;
const listItemWidth = windowWidth - 40; // Subtracting twice the marginHorizontal

const LifeCategories = ({
  showHowToOvercome,
  hideLonelinessContent,
  handleBack,
  category,
}) => {
  const [currentPage, setCurrentPage] = useState('LifeCategories');

  const dispatch = useDispatch();

  const topicTitles = useSelector(state => state.topics.topicTitles);

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

  useEffect(() => {
    const backAction = () => {
      if (currentPage === 'LifeTopicTitles') {
        setCurrentPage('LifeCategories');
        dispatch(removeLastBreadcrumb());
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
    if (currentPage === 'LifeTopicTitles') {
      setCurrentPage('LifeCategories');
      dispatch(removeLastBreadcrumb());
      return true;
    }
    return false;
  };

  const [selectedTopic, setSelectedTopic] = useState(null);

  const handlePress = action => {
    dispatch(fetchMedia(action, category));
    setCurrentPage('LifeTopicTitles');
    setSelectedTopic(action); // Update the selected category
    dispatch(setBreadcrumb(action));
  };

  useEffect(() => {
    if (category) {
      dispatch(fetchCategoryTopics(category));
    }
  }, [dispatch, category]); // Add dependencies here

  if (currentPage === 'LifeTopicTitles') {
    return (
      <View style={styles.container}>
        <LifeTopicTitles
          handleBack={handleBackPage}
          topic={selectedTopic}
          category={category}
        />
      </View>
    );
  }

  if (showHowToOvercome) {
    return (
      <LifeTopicTitles
        handleBack={hideLonelinessContent}
        topic="How to Overcome Loneliness"
        category="Loneliness"
      />
    );
  }

  return (
    <View style={styles.optionsContainer}>
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
      {Array.isArray(topicTitles) &&
        topicTitles.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.lonelinessOptions,
              {
                backgroundColor: colors[index % colors.length],
                width: listItemWidth,
                marginTop: 10,
              },
            ]}
            onPress={() => handlePress(item)}>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 15, fontWeight: '500', color: 'black'}}>
                {item}
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
  );
};

export default LifeCategories;

const styles = StyleSheet.create({
  optionsContainer: {
    marginBottom: 60,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  lonelinessOptions: {
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
