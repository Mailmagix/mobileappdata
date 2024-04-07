import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {updatePopupResponse} from '../../store/actions/popupActions';

const CheckboxPopup = ({userId, data, onClose, onSkip}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const dispatch = useDispatch();

  const toggleOption = option => {
    setSelectedOptions(prevSelectedOptions =>
      prevSelectedOptions.includes(option)
        ? prevSelectedOptions.filter(prevOption => prevOption != option)
        : [...prevSelectedOptions, option],
    );
  };

  const handleSubmit = () => {
    console.log('Selected Options: ', selectedOptions);
    dispatch(updatePopupResponse(data._id, userId, selectedOptions, true));
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
        <Text style={styles.subtitle}>{data.title}</Text>
        <View style={styles.optionsContainer}>
          {data.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedOptions.includes(option) && styles.optionButtonSelected,
              ]}
              onPress={() => toggleOption(option)}>
              <Text
                style={[
                  styles.optionText,
                  selectedOptions.includes(option) && styles.optionSelectedText,
                ]}>
                {option}
              </Text>
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

export default CheckboxPopup;

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
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'black',
  },
  subtitle: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 20,
    fontWeight: '400',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    margin: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  optionButtonSelected: {
    backgroundColor: 'black',
  },
  optionSelectedText: {
    color: 'white',
  },
  optionText: {
    fontSize: 16,
    color: '#BBBBBB',
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
