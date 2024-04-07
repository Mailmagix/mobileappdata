import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchVideos} from '../../../store/actions/videoLibraryActions';
import {loadUserSession} from '../../../store/actions/sessionStorageActions';
import VideoLibraryItem from '../videoLibrary/videoLibraryItem';

const Videos = ({handleBack, videos}) => {
  // const Videos = useSelector(state => state.videos.videos) || [];

  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the action to load user session (if needed)
    dispatch(loadUserSession())
      .then(() => {
        // After user session is loaded, you can dispatch your fetch actions
        dispatch(fetchVideos());
      })
      .catch(error => {
        // Handle any errors related to loading user session
        console.error('Error loading user session:', error);
      });
  }, [dispatch]);

  return (
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
        Videos
      </Text>
      {videos.map((video, index) => (
        <VideoLibraryItem
          key={index}
          video={video}
          index={index}
          totalItems={Videos.length}
        />
      ))}
    </View>
  );
};

export default Videos;

const styles = StyleSheet.create({
  backButton: {
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    paddingVertical: 10,
  },
});
