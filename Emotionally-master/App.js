import React, {useEffect} from 'react';
import {StyleSheet, Text, View, PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MyStack from './navigation';
import {useDispatch} from 'react-redux';
import {clearBreadcrumb} from './store/actions/breadcrumbActions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Reset breadcrumb on app launch
    dispatch(clearBreadcrumb());
  }, [dispatch]);

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    try {
      console.log('asking for permission');
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);
      if (
        granted['android.permission.CAMERA'] &&
        granted['android.permission.RECORD_AUDIO'] &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] &&
        granted['android.permission.READ_EXTERNAL_STORAGE']
      ) {
        console.log('You can use the camera');
        console.log('You can use the audio');
      } else {
        console.log('Camera permission denied');
        console.log('Audio permission denied');
      }
    } catch (error) {
      console.log('permission error', error);
    }
  };

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
