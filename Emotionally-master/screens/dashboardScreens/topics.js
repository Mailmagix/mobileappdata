import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Life from './topicsComponents/life';
import {
  removeLastBreadcrumb,
  setBreadcrumb,
} from '../../store/actions/breadcrumbActions';
import {useDispatch} from 'react-redux';
import {fetchCategoryTopics} from '../../store/actions/topicsLibraryActions';
import LifeCategories from './topicsComponents/lifeCategories';

const Topics = ({showLonelinessContent, handleBack}) => {
  const [activeTab, setActiveTab] = useState('Life'); // Setting 'Life' as the default active tab
  const [currentPage, setCurrentPage] = useState('Tabs');

  const dispatch = useDispatch();

  // Define your tabs in an array
  const tabs = ['Life', 'Work'];

  const handleBackPage = () => {
    if (currentPage === 'LifeCategories') {
      setCurrentPage('Tabs');
      dispatch(removeLastBreadcrumb());
      return true;
    }
    return false;
  };

  useEffect(() => {
    const backAction = () => {
      if (currentPage === 'LifeCategories') {
        setCurrentPage('Tabs');
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

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handlePress = action => {
    dispatch(fetchCategoryTopics(action));
    setCurrentPage('LifeCategories');
    setSelectedCategory(action); // Update the selected category
    dispatch(setBreadcrumb(action));
  };

  if (currentPage === 'LifeCategories') {
    return (
      <View style={styles.container}>
        <LifeCategories
          handleBack={handleBackPage}
          category={selectedCategory}
        />
      </View>
    );
  }

  if (showLonelinessContent) {
    return (
      <LifeCategories
        showHowToOvercome={true}
        hideLonelinessContent={handleBack}
      />
    );
  }

  return (
    <View style={styles.container}>
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
        <View style={styles.tabsContainer}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => handleTabChange(tab)}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.content}>
          {activeTab === 'Life' && <Life onChangeContent={handlePress} />}
          {activeTab === 'Work' && (
            <Text style={{color: 'black', padding: 10, fontSize: 18}}>
              Work Content
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default Topics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#E9DBF9',
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    // overflow: 'hidden',
  },
  tab: {
    height: 35,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'black',
    borderRadius: 25,
  },
  tabText: {
    color: 'black',
  },
  activeTabText: {
    color: 'white',
  },
  content: {
    fontSize: 18,
  },
});
