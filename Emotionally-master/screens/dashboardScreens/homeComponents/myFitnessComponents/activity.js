import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import ActivityCategoriesArray from './activityCategoriesArray';

const Activity = ({onChangeContent}) => {
  const handlePress = action => {
    if (action === 'Worry Tree') {
      onChangeContent('Worry Tree');
    } else if (action === 'Anxiety') {
      onChangeContent('Anxiety');
    } else if (action === 'Burnout') {
      onChangeContent('Burnout');
    } else if (action === 'Aerobics') {
      onChangeContent('Aerobics');
    } else if (action === 'Zumba') {
      onChangeContent('Zumba');
    } else if (action === 'Hiking') {
      onChangeContent('Hiking');
    } else if (action === 'Crossfit') {
      onChangeContent('Crossfit');
    } else if (action === 'Cycling') {
      onChangeContent('Cycling');
    } else if (action === 'Walking') {
      onChangeContent('Walking');
    }
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: '#000000',
          fontSize: 16,
          fontWeight: '400',
          marginHorizontal: 20,
        }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>
      <View style={styles.categorySections}>
        <View style={styles.heading}>
          <View>
            <Text style={{color: '#000000', fontSize: 16, fontWeight: '700'}}>
              CATEGORY
            </Text>
          </View>
          <TouchableOpacity>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                fontWeight: '500',
                textDecorationLine: 'underline',
              }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.fitnessContainer}>
          {ActivityCategoriesArray.map((item, index) => (
            <View key={index} style={styles.categoryView}>
              <TouchableOpacity
                style={[
                  styles.fitnessCategories,
                  {
                    backgroundColor: item.backgroundColor,
                  },
                ]}
                onPress={() => handlePress(item.title)}>
                <Image
                  source={item.image}
                  style={styles.finessCategoryImage}
                  resizeMode="contain"
                />
                <Text style={{color: 'black', fontSize: 15}}>{item.title}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => handlePress(item.title)}>
                <Text style={styles.startButtonText}>CLICK TO SEE</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Activity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  categorySections: {
    marginTop: 10,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  fitnessContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  finessCategoryImage: {
    height: 80,
    width: 80,
    alignSelf: 'center',
  },
  categoryView: {
    marginBottom: 20,
  },
  fitnessCategories: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 110,
    width: 100,
  },
  startButton: {
    marginTop: 5,
    backgroundColor: '#FFC524',
    width: 100,
    height: 25,
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 10,
  },
});
