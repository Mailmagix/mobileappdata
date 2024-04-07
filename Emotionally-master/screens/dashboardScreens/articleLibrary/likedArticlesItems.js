import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import SmallDotIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const LikedArticlesItems = ({article, showReadArticlePage}) => {
  const handleButtonPress = () => {
    // Call the callback function to show the ReadArticlePage
    showReadArticlePage();
  };

  return (
    <View>
      <View
        style={[
          styles.articleWrapper,
          {backgroundColor: article.backgroundColor},
        ]}>
        <Text style={styles.subTitle}>{article.subTitle}</Text>
        <View style={styles.duration}>
          <Text style={styles.text}>Article</Text>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <SmallDotIcon name={'circle-small'} size={25} color="black" />
          </View>
          <Text style={styles.text}>{article.duration}</Text>
        </View>
        <Text style={styles.title}>{article.title}</Text>
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: article.buttonBackgroundColor},
          ]}
          onPress={handleButtonPress}>
          <Text style={styles.buttonText}>{article.buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LikedArticlesItems;

const styles = StyleSheet.create({
  articleWrapper: {
    width: 150,
    height: 200,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTitle: {
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  duration: {
    marginTop: 5,
    color: 'black',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
  title: {
    color: 'black',
    fontWeight: '700',
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 15,
  },
});
