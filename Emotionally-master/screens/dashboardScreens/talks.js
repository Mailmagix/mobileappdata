import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import TalksItems from './talksComponents/talksItems';
import {useDispatch, useSelector} from 'react-redux';
import {loadUserSession} from '../../store/actions/sessionStorageActions';
import {fetchVideos} from '../../store/actions/videoLibraryActions';

const Talks = () => {
  const dispatch = useDispatch();
  const Videos = useSelector(state => state.videos.videos) || [];

  useEffect(() => {
    // Dispatch the action to load user session (if needed)
    dispatch(fetchVideos());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {Videos.map((video, index) => (
        <TalksItems key={index} video={video} index={index} />
      ))}
    </View>
  );
};

export default Talks;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingBottom: 50,
    marginVertical: 10,
  },
});
