import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ReadArticlePage from '../articleLibrary/readArticlePage';
import {fetchArticles} from '../../../store/actions/articleLibraryActions';
import {useDispatch, useSelector} from 'react-redux';
import {loadUserSession} from '../../../store/actions/sessionStorageActions';
import Arrows from 'react-native-vector-icons/MaterialCommunityIcons';

const windowWidth = Dimensions.get('window').width;
const listItemWidth = windowWidth - 40; // Subtracting twice the marginHorizontal

const Articles = ({handleBack, articles}) => {
  const [currentPage, setCurrentPage] = useState('Articles');
  // const Articles = useSelector(state => state.articles.articles) || [];

  const dispatch = useDispatch();

  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showReadArticle, setShowReadArticle] = useState(false);

  // Callback function to show the ReadArticlePage
  const showReadArticlePage = article => {
    setSelectedArticle(article);
    setShowReadArticle(true);
  };

  const VisibilityChange = () => {
    setCurrentPage('Articles');
  };

  useEffect(() => {
    // Dispatch the action to load user session (if needed)
    dispatch(loadUserSession())
      .then(() => {
        // After user session is loaded, you can dispatch your fetch actions
        dispatch(fetchArticles());
      })
      .catch(error => {
        // Handle any errors related to loading user session
        console.error('Error loading user session:', error);
      });
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {showReadArticle ? (
        <ReadArticlePage
          article={selectedArticle}
          setShowReadArticle={setShowReadArticle}
          onReadArticleVisibilityChange={VisibilityChange}
        />
      ) : (
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
          <Text style={{color: 'black', fontSize: 20, textAlign: 'center'}}>
            Articles
          </Text>
          <View style={styles.optionsContainer}>
            {articles.map((article, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.options,
                  {
                    backgroundColor: article.backgroundColor,
                    width: listItemWidth,
                    marginTop: 10,
                  },
                ]}
                onPress={() => showReadArticlePage(article)}>
                <View style={{flex: 1}}>
                  <Text
                    style={{fontSize: 15, fontWeight: '500', color: 'black'}}>
                    {article.title}
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
        </View>
      )}
    </View>
  );
};

export default Articles;

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
});
