import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {updatePopupResponse} from '../../store/actions/popupActions';

const RadiobuttonPopup = ({userId, data, onClose, onSkip}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log('Selected Option: ', selectedOption);
    dispatch(updatePopupResponse(data._id, userId, selectedOption, true));
    onClose();
  };

  // const handleSkip = () => {
  //   dispatch(updatePopupResponse(data._id, userId, [], false)); // Passing empty answer and false for submit
  //   onSkip();
  // };

  return (
    <View style={styles.container}>
      <View style={styles.modalView}>
        <Text style={styles.title}>{data.question}</Text>
        <View style={styles.optionsContainer}>
          {data.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => setSelectedOption(option)}>
              <View style={styles.radioButton}>
                {selectedOption === option && (
                  <View style={styles.radioButtonSelected} />
                )}
              </View>
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
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

export default RadiobuttonPopup;

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
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10, // Add some vertical margin for spacing between rows
    width: '50%', // Set width to 50% to have 2 buttons per row
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  optionText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
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
