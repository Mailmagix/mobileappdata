import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import AngerShooting from './angerShooting';

const UploadImageForAnger = ({navigation}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [image, setImage] = useState(null);

  const handleSubmit = () => {
    setIsPressed(true);
    setShowContent(!showContent);
  };

  const handleImageUpload = () => {
    setIsPressed(true);
    ImagePicker.openPicker({
      mediaType: 'photo',
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(response => {
        setImage(response);
      })
      .catch(err => {
        console.log('Image picker error:', err);
      });
  };

  return (
    <View style={styles.container}>
      {showContent ? (
        <View>
          <AngerShooting navigation={navigation} image={image.path} />
        </View>
      ) : (
        <>
          <TouchableOpacity
            style={[
              styles.button,
              {backgroundColor: isPressed ? '#0f70f7' : '#46c4e8'},
            ]}
            onPress={handleImageUpload}>
            <Text style={styles.buttonText}>Upload image</Text>
          </TouchableOpacity>
          {image && (
            <>
              <Image
                source={{uri: image.path}}
                style={[styles.image, {width: 300, height: 350}]}
              />
              <TouchableOpacity
                style={[
                  styles.button,
                  {backgroundColor: isPressed ? '#0f70f7' : '#46c4e8'},
                  {marginTop: 20},
                ]}
                onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default UploadImageForAnger;

const styles = StyleSheet.create({
  container: {
    fontFamily: 'ProximaNova-Regular',
    flexGrow: 1,
    flexDirection: 'column',
  },
  button: {
    alignItems: 'center',
    borderRadius: 20,
    padding: 15,
    marginTop: 25,
    width: 300,
    alignSelf: 'center',
  },
  image: {
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
