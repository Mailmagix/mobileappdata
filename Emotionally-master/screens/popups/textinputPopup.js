import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {updatePopupResponse} from '../../store/actions/popupActions';

const TextinputPopup = ({userId, data, onClose, onSkip}) => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log('Submitted Text: ', text);
    dispatch(updatePopupResponse(data._id, userId, [text], true));
    onClose();
  };

  // const handleSkip = () => {
  //   dispatch(updatePopupResponse(data._id, userId, [], false)); // Passing empty answer and false for submit
  //   onSkip();
  // };

  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Write something here"
            placeholderTextColor="black"
            value={text}
            onChangeText={setText}
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>SUBMIT</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSkip}>
          <Text style={styles.skipText}>SKIP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TextinputPopup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    width: 300,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'black',
  },
  inputContainer: {
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
    height: 40,
  },
  input: {
    color: '#000000',
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    backgroundColor: '#ebe9e4',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#63D9A0',
    padding: 10,
    borderRadius: 26,
    height: 45,
    width: 120,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '700',
  },
  skipText: {
    marginTop: 10,
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
});
