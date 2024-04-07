import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import CloseIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ShareIcon from 'react-native-vector-icons/SimpleLineIcons';
import ListenOnTheGo from './listenOnTheGo';
import HeartIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {likeArticle} from '../../../store/actions/likedArticlesActions';

const ReadArticlePage = ({
  article,
  setShowReadArticle,
  onReadArticleVisibilityChange,
}) => {
  const handleGoBack = () => {
    onReadArticleVisibilityChange(true);
    setShowReadArticle(false);
  };

  const [isArticleLiked, setIsArticleLiked] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // Define an async function to fetch the userId
    const fetchUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId && Array.isArray(article.likes)) {
          setIsArticleLiked(article.likes.includes(userId));
        }
      } catch (error) {
        console.error('Error fetching userId from AsyncStorage: ', error);
      }
    };

    // Call the async function to fetch the userId
    fetchUserId();
  }, [article]);

  const toggleArticleLike = () => {
    setIsArticleLiked(!isArticleLiked);
    dispatch(likeArticle(article)); // Dispatch the likeArticle action when the like button is pressed
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.closeIcon}>
        <CloseIcon
          name="close-circle-outline"
          size={30}
          color="black"
          style={{textAlign: 'right', paddingHorizontal: 20}}
        />
      </TouchableOpacity>
      <Image
        source={{uri: article.image}}
        style={styles.articleImage}
        resizeMode="stretch"
      />
      <Text style={styles.articleHeading}>{article.articleHeading}</Text>
      <Text style={styles.articleSubHeading}>{article.articleSubHeading}</Text>
      <TouchableOpacity
        style={{
          alignSelf: 'center',
        }}
        onPress={toggleArticleLike}>
        <HeartIcon
          name={isArticleLiked ? 'heart' : 'heart-outline'}
          size={35}
          color="red"
        />
      </TouchableOpacity>
      <View style={styles.audioContainer}>
        <ListenOnTheGo audioLink={article.audioLink} />
      </View>
      <Text style={styles.articleDescription}>
        {article.articleDescription}
      </Text>
      <View style={styles.shareOption}>
        <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
          Share
        </Text>
        <Text style={{marginLeft: 5, fontWeight: 'bold'}}>
          <ShareIcon
            name="share"
            size={20}
            color={'black'}
            style={{fontWeight: 'bold'}}
          />
        </Text>
      </View>
    </View>
  );
};

export default ReadArticlePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 50,
  },
  articleImage: {
    width: 300,
    height: 300,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  articleHeading: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  articleSubHeading: {
    color: 'black',
    fontSize: 13,
    fontWeight: '700',
    marginVertical: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
  articleDescription: {
    marginTop: 15,
    color: 'black',
    alignSelf: 'center',
    textAlign: 'center',
    // alignItems: 'center',
    paddingHorizontal: 20,
  },
  shareOption: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
    top: 20,
  },
  audioContainer: {
    // alignSelf: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
});
