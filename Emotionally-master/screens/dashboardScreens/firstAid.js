import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import UploadImageForAnger from './uploadImageForAnger';
import ConsultantArray from './firstAidComponents/consultantArray';
import FirstAidTopicsArray from './firstAidComponents/firstAidTopicsArray';
import Arrows from 'react-native-vector-icons/MaterialCommunityIcons';

const FirstAid = ({navigation}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [showUploadContent, setShowUploadContent] = useState(false);

  const handleButtonPress = () => {
    setIsPressed(true);
    setShowUploadContent(!showUploadContent);
  };

  const [showSadnessContent, setShowSadnessContent] = useState(false);

  const handleSadnessContent = () => {
    setShowSadnessContent(!showSadnessContent);
  };

  return (
    <View style={styles.container}>
      {showUploadContent ? (
        <ScrollView>
          <UploadImageForAnger navigation={navigation} />
        </ScrollView>
      ) : showSadnessContent ? (
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: isPressed ? '#0f70f7' : '#46c4e8'},
          ]}
          onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Vent Anger</Text>
        </TouchableOpacity>
      ) : (
        <View>
          <Text
            style={{
              color: 'black',
              fontWeight: '700',
              fontSize: 25,
              textAlign: 'center',
              marginTop: 25,
            }}>
            We’re here to help you
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              color: 'black',
              textAlign: 'center',
              marginTop: 5,
            }}>
            Find immediate assistance for your challenges and sorrows.
          </Text>
          <View style={styles.consultantOptionsView}>
            {ConsultantArray.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.consultantOption,
                  {backgroundColor: item.backgroundColor},
                ]}>
                <Text style={styles.consultantOptionText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{marginVertical: 25}}>
            {FirstAidTopicsArray.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.firstAidTopic,
                  {backgroundColor: item.backgroundColor},
                ]}
                onPress={() => {
                  if (item.title === 'Sadness') {
                    handleSadnessContent();
                  }
                }}>
                <View style={{flex: 1}}>
                  <Text
                    style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      marginTop: 5,
                      textAlign: 'left',
                      paddingRight: 25,
                    }}>
                    {item.description}
                  </Text>
                </View>
                <View>
                  <Arrows
                    name="chevron-right"
                    size={30}
                    color="black"
                    style={{fontWeight: 'bold'}}
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

export default FirstAid;

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
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  consultantOptionsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20,
    // alignSelf: 'center',
  },
  consultantOption: {
    borderRadius: 50,
    height: 100,
    width: 100,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  consultantOptionText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  firstAidTopic: {
    marginHorizontal: 20,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    height: 100,
    paddingHorizontal: 20,
  },
});
