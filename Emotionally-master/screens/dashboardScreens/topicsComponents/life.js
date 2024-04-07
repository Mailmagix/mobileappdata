import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect} from 'react';
import LifeTopicsArray from './lifeTopicsArray';
import {useDispatch, useSelector} from 'react-redux';
import {fetchTopics} from '../../../store/actions/topicsLibraryActions';

const Life = ({onChangeContent}) => {
  const dispatch = useDispatch();

  const topicCategory = useSelector(state => state.topics.topics);

  const colors = [
    '#FF8E4F',
    '#63D9A0',
    '#82E6E6',
    '#FFC524',
    '#BE8FEA',
    '#B4E682',
    '#FF8E4F',
    '#63D9A0',
    '#82E6E6',
  ];

  const handlePress = action => {
    onChangeContent(action);
  };

  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.lifeContainer}>
        {topicCategory.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.lifeTopics,
              {backgroundColor: colors[index % colors.length]},
            ]}
            onPress={() => handlePress(item.category)}>
            <Image
              source={{uri: item.image}}
              style={styles.topicItemImage}
              resizeMode="contain"
            />
            <Text style={{color: 'black', fontSize: 15}}>{item.category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Life;

const styles = StyleSheet.create({
  lifeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  topicItemImage: {
    height: 70,
    width: 70,
    alignSelf: 'center',
  },
  lifeTopics: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 110,
    width: 100,
    marginBottom: 10,
  },
});
