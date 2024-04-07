import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Slides from '../components/slides';
import {
  storeSelectedOptions,
  clearSelectedOptions,
  submitAnswersToDatabase,
} from '../store/actions/selectedOptionsActions';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation, route}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const userId = useSelector(state => state.sessionDetails.userId);

  // Check if redirected from the 'Profile' page
  const redirectedFromProfile = route?.params?.redirectedFromProfile;

  const handleNext = async () => {
    if (currentPage < Slides.length - 1) {
      // Check if an option is selected for the current question
      if (selectedOptions[currentPage]) {
        try {
          await dispatch(
            submitAnswersToDatabase(
              selectedOptions[currentPage],
              currentPage,
              navigation,
            ),
          );
        } catch (error) {
          console.error('Failed to submit answers:', error);
          // Handle error as needed
        }
        setCurrentPage(currentPage + 1);
      } else {
        // Display an error message or take appropriate action if no option is selected
        console.error('Please select an option before proceeding.');
      }
    } else {
      submitAnswers();
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSkip = async () => {
    if (currentPage < Slides.length - 1) {
      try {
        await dispatch(
          submitAnswersToDatabase(
            selectedOptions[currentPage],
            currentPage,
            navigation,
          ),
        ); // Submit an empty array for skipped question
      } catch (error) {
        console.error('Failed to submit answers:', error);
        // Handle error as needed
      }
      setCurrentPage(currentPage + 1);
    } else {
      submitAnswers();
    }
  };

  const handleOptionPress = async option => {
    const updatedSelectedOptions = [...selectedOptions]; // Create a copy of selectedOptions

    // Check if the option is already selected for the current page
    const currentPageSelectedOptions =
      updatedSelectedOptions[currentPage] || [];

    // Toggle the selection of the clicked option
    if (currentPageSelectedOptions.includes(option)) {
      // If the option is already selected, remove it
      const updatedPageSelectedOptions = currentPageSelectedOptions.filter(
        item => item !== option,
      );
      updatedSelectedOptions[currentPage] = updatedPageSelectedOptions;
    } else {
      // If the option is not selected, add it
      updatedSelectedOptions[currentPage] = [
        ...currentPageSelectedOptions,
        option,
      ];
    }

    setSelectedOptions(updatedSelectedOptions); // Update the state with the new selectedOptions
    // Store the updated selectedOptions in AsyncStorage for the specific userId
    try {
      await AsyncStorage.setItem(
        `selectedOptions_${userId}`,
        JSON.stringify(updatedSelectedOptions),
      );
    } catch (error) {
      console.error('Error storing selectedOptions:', error);
      // Handle error as needed
    }
  };

  const focusedOption = option => {
    const currentPageSelectedOptions = selectedOptions[currentPage] || [];
    return currentPageSelectedOptions.includes(option);
  };

  const submitAnswers = async () => {
    try {
      const lastQuestionIndex = Slides.length - 1;
      const response = await dispatch(
        submitAnswersToDatabase(
          selectedOptions[lastQuestionIndex],
          lastQuestionIndex,
          navigation,
        ),
      );

      // Check if the response indicates success
      if (response) {
        // Navigation to the Dashboard page
        // Determine the navigation destination based on the parameter
        if (redirectedFromProfile) {
          // If redirected from 'Profile', navigate back to 'Profile' after submission
          navigation.navigate('Dashboard', {activePage: 4});
        } else {
          // If redirected from 'Login' or elsewhere, navigate to 'Dashboard'
          navigation.navigate('Dashboard', {activeTab: 1});
        }

        // Store selectedOptions after storing the last answer
        dispatch(storeSelectedOptions(selectedOptions));
      } else {
        // Handle the case where the submission was not successful
        console.error('Submission was not successful:', response);
      }
    } catch (error) {
      console.error('Failed to submit answers:', error);
      // Handle error as needed
    }
  };

  // Reset currentPage to 0 when the component mounts
  useEffect(() => {
    if (redirectedFromProfile) {
      setCurrentPage(0);
    }
  }, [redirectedFromProfile]);

  useEffect(() => {
    const retrieveSelectedOptions = async () => {
      try {
        // Retrieve selectedOptions from AsyncStorage for the specific userId
        const storedSelectedOptions = await AsyncStorage.getItem(
          `selectedOptions_${userId}`,
        );
        if (storedSelectedOptions) {
          setSelectedOptions(JSON.parse(storedSelectedOptions));
        }
      } catch (error) {
        console.error('Error retrieving selectedOptions:', error);
        // Handle error as needed
      }
    };

    retrieveSelectedOptions();
  }, [userId]); // Run the effect whenever userId changes

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Text style={{fontSize: 15, color: 'black'}}>
            {currentPage + 1} OF {Slides.length}
          </Text>
          {currentPage < Slides.length - 1 ? (
            <TouchableOpacity onPress={handleSkip}>
              <Text style={{color: 'black'}}>SKIP</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleSkip}>
              <Text style={{color: 'black'}}>SKIP</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>{Slides[currentPage].heading}</Text>
          <Text style={styles.question}>{Slides[currentPage].question}</Text>
          <Text style={styles.subheading}>
            {Slides[currentPage].subheading}
          </Text>
          <Image
            source={Slides[currentPage].image}
            style={{
              height: 150,
              width: 150,
              justifyContent: 'center',
              alignSelf: 'center',
              marginBottom: 5,
            }}
          />
          {Slides[currentPage].options.map((option, index) => (
            <TouchableOpacity
              style={[
                styles.OptionButton,
                focusedOption(option) && styles.optionButtonFocused,
              ]}
              onPress={() => handleOptionPress(option)}
              key={index}>
              <Text
                style={[
                  styles.option,
                  focusedOption(option) && styles.optionTextFocused,
                ]}
                key={index}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            marginTop: 30,
          }}>
          {currentPage > 0 && (
            <TouchableOpacity style={styles.button} onPress={handlePrevious}>
              <Text style={styles.buttonText}>PREVIOUS</Text>
            </TouchableOpacity>
          )}
          {currentPage < Slides.length - 1 ? (
            <TouchableOpacity
              style={[
                styles.button,
                currentPage === 0 && styles.buttonRightAlign,
              ]}
              onPress={handleNext}>
              <Text style={styles.buttonText}>NEXT</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>GET STARTED</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    padding: 10,
    flexGrow: 1,
    fontFamily: 'ProximaNova-Regular',
  },
  textContainer: {
    padding: 10,
    marginTop: 20,
  },
  buttonRightAlign: {
    marginLeft: 'auto',
  },
  optionButtonFocused: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  optionTextFocused: {
    color: 'white',
  },
  heading: {
    fontSize: 15,
    marginBottom: 8,
    letterSpacing: 3,
    color: '#000000',
  },
  question: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 10,
    paddingRight: 40,
    lineHeight: 35,
    color: 'black',
  },
  subheading: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 20,
    color: 'black',
  },
  option: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: 'black',
  },
  OptionButton: {
    paddingVertical: 12,
    marginVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#000000',
    padding: 12,
    paddingHorizontal: 6,
    width: 120,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  sliderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
