import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import SmallDotIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const ArticleItem = ({article, showReadArticlePage, index, totalItems}) => {
  const handleButtonPress = () => {
    // Call the callback function to show the ReadArticlePage
    showReadArticlePage();
  };

  return (
    <View
      style={{
        marginLeft: index === 0 ? 20 : 15,
        marginRight: index === totalItems - 1 ? 20 : 0,
      }}>
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

export default ArticleItem;

const styles = StyleSheet.create({
  articleWrapper: {
    width: 270,
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subTitle: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
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
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 25,
    alignSelf: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'black',
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 18,
  },
});
