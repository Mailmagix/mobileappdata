import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {fetchTopDiscussions} from '../../../store/actions/topDiscussionsActions';

const TopDiscussionsItem = ({topDiscussion = []}) => {
  const uniqueCategories = [
    ...new Set(topDiscussion.map(item => item.category)),
  ];

  const [activeCategory, setActiveCategory] = useState(uniqueCategories[0]);

  const handleCategoryPress = category => {
    setActiveCategory(category);
  };

  const filteredDiscussions = topDiscussion.filter(
    item => item.category === activeCategory,
  );

  // Get the length of filteredDiscussions
  const totalItems = filteredDiscussions.length;

  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the action to fetch discussions when the component mounts
    dispatch(fetchTopDiscussions());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        {uniqueCategories.map(category => (
          <TouchableOpacity
            key={category}
            style={styles.categoryButton}
            onPress={() => handleCategoryPress(category)}>
            <Text style={styles.categoryButtonText}>{category}</Text>
            {activeCategory === category && <View style={styles.activeLine} />}
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filteredDiscussions.map((item, index) => (
          <View
            key={index}
            style={[
              styles.doctorContainer,
              {
                marginLeft: index === 0 ? 20 : 15,
                marginRight: index === totalItems - 1 ? 20 : 0,
              },
            ]}>
            <View style={styles.doctorInfo}>
              <Image source={{uri: item.image}} style={styles.doctorImage} />
              <View>
                <Text style={styles.doctorName}>{item.doctorName}</Text>
                <Text style={styles.doctorRole}>{item.doctorRole}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}>
        {filteredDiscussions.map((item, index) => (
          <View
            key={index}
            style={[
              styles.emotionalTypeBox,
              {
                backgroundColor: item.backgroundColor,
                marginLeft: index === 0 ? 20 : 15,
                marginRight: index === totalItems - 1 ? 20 : 0,
              },
            ]}>
            <Text style={styles.emotionalType}>{item.emotionalType}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TopDiscussionsItem;

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  categoryButtonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
    paddingLeft: 5,
    paddingRight: 5,
  },
  activeLine: {
    backgroundColor: '#FF8E4F',
    height: 2,
    marginTop: 5,
    borderRadius: 20,
  },
  scrollView: {
    marginTop: 10,
  },
  doctorContainer: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  doctorName: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
  },
  doctorRole: {
    color: 'black',
  },
  emotionalTypeBox: {
    padding: 35,
    borderRadius: 15,
    alignItems: 'center',
  },
  emotionalType: {
    color: 'black',
    fontWeight: 'bold',
  },
});
