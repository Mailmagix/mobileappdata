import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  BackHandler,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {loadUserSession} from '../store/actions/sessionStorageActions';

import Home from './dashboardScreens/home';
import Topics from './dashboardScreens/topics';
import SearchIcon from 'react-native-vector-icons/FontAwesome';
import HomeIcon from '../assets/images/Home.png';
import ConversationIcon from '../assets/images/Conversation.png';
import FriendIcon from '../assets/images/Friend.png';
import TopicsIcon from '../assets/images/Topics.png';
import WaveBorder from './dashboardScreens/waveFooter';
import SeeNew from './dashboardScreens/homeComponents/seeNew';
import Me from './dashboardScreens/me';
import {
  clearBreadcrumb,
  setBreadcrumb,
} from '../store/actions/breadcrumbActions';
import Breadcrumb from './dashboardScreens/breadcrumb';
import Talks from './dashboardScreens/talks';
import MyFitness from './dashboardScreens/myFitness';
import Therapist from './dashboardScreens/homeComponents/footerComponents/therapist';
import Sos from './dashboardScreens/homeComponents/footerComponents/sos';
import MyActivities from './dashboardScreens/myActivities';
import Friends from './dashboardScreens/friends';
import Conversation from './dashboardScreens/conversationComponents/conversation';
import Info from './dashboardScreens/homeComponents/footerComponents/info';
import {
  fetchPopups,
  setCurrentPopup,
  setModalVisibility,
} from '../store/actions/popupActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckboxPopup from './popups/checkboxPopup';
import RadiobuttonPopup from './popups/radiobuttonPopup';
import TextinputPopup from './popups/textinputPopup';
import {fetchData} from '../store/actions/searchActions';
import SearchContents from './searchContents';

const windowWidth = Dimensions.get('window').width;
const listItemWidth = windowWidth - 40; // Subtracting twice the marginHorizontal

const Tab = ({title, active, onPress, icon}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.tab}>
      <Image source={icon} style={styles.headerIcons} />
      <Text style={[styles.tabText, active && styles.activeTabText]}>
        {title}
      </Text>
    </View>
    {active && <View style={styles.activeIndicator} />}
  </TouchableOpacity>
);

const Dashboard = ({navigation, route}) => {
  // Check if an activePage parameter is provided in the route
  const activePageFromParams = route?.params?.activePage;

  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.sessionDetails.isLoggedIn);

  const breadcrumb = useSelector(state => state.navigation.breadcrumbs);

  const [search, setSearch] = useState('');

  const [activeTab, setActiveTab] = useState('Home');
  const [tabHistory, setTabHistory] = useState(['Home']); // Keeping a history of tabs

  const [viewControl, setViewControl] = useState('tabs');
  const [footerTabHistory, setFooterTabHistory] = useState([0]);

  const [isViewingSeeNew, setIsViewingSeeNew] = useState(false);
  const [isViewingTopics, setIsViewingTopics] = useState(false);
  const [isViewingTalks, setIsViewingTalks] = useState(false);
  const [isViewingMyFitness, setIsViewingMyFitness] = useState(false);
  const [isViewingMyActivities, setIsViewingMyActivities] = useState(false);

  useEffect(() => {
    if (activeTab !== 'Home') {
      // Whenever activeTab changes and is not 'Home', reset the breadcrumb
      dispatch(clearBreadcrumb());
    }
    if (activeTab === 'Home') {
      // Whenever activeTab changes and is not 'Home', reset the breadcrumb
      setIsViewingSeeNew(false);
      setIsViewingTopics(false);
      setIsViewingTalks(false);
      setIsViewingMyFitness(false);
      setIsViewingMyActivities(false);
      dispatch(clearBreadcrumb());
    }
  }, [activeTab, dispatch]);

  useEffect(() => {
    if (activeTab === 'Topics') {
      dispatch(setBreadcrumb('Topics'));
    }
  }, [activeTab, dispatch]);

  const handleTabPress = tab => {
    if (activeTab === tab) {
      return;
    }

    if (activeTab === 'Home' && isViewingSeeNew) {
      setIsViewingSeeNew(false);
      dispatch(clearBreadcrumb()); // Dispatch the action to clear the breadcrumb
    }
    // if (activeTab === 'Home' && isViewingTopics) {
    //   setActiveTab('Home');
    //   dispatch(clearBreadcrumb()); // Dispatch the action to clear the breadcrumb
    // }
    if (activeTab === 'Home' && isViewingTalks) {
      setIsViewingTalks(false);
      dispatch(clearBreadcrumb()); // Dispatch the action to clear the breadcrumb
    }
    if (activeTab === 'Home' && isViewingMyFitness) {
      setIsViewingMyFitness(false);
      dispatch(clearBreadcrumb()); // Dispatch the action to clear the breadcrumb
    }
    if (activeTab === 'Home' && isViewingMyActivities) {
      setIsViewingMyActivities(false);
      dispatch(clearBreadcrumb()); // Dispatch the action to clear the breadcrumb
    }
    setActiveTab(tab);
    setTabHistory([...tabHistory, tab]); // Add the new tab to the history
    setViewControl('tabs');
  };

  // Handler for when 'seeNew' is pressed within the Home tab
  const handleSeeNewPress = () => {
    dispatch(setBreadcrumb('See New'));
    setIsViewingSeeNew(true);
  };

  // Handler for when 'Topics' is pressed within the Home tab
  const handleTopicsPress = () => {
    // setIsViewingTopics(true);
    setActiveTab('Topics');
  };

  // Handler for when 'Talks' is pressed within the Home tab
  const handleTalksPress = () => {
    setIsViewingTalks(true);
  };

  // Handler for when 'My Fitness' is pressed within the Home tab
  const handleMyFitnessPress = () => {
    setIsViewingMyFitness(true);
  };

  // Handler for when 'My Activities' is pressed within the Home tab
  const handleMyActivitiesPress = () => {
    setIsViewingMyActivities(true);
  };

  const handleBackToHome = () => {
    if (isViewingSeeNew) {
      setIsViewingSeeNew(false);
      dispatch(clearBreadcrumb()); // Dispatch the action to clear the breadcrumb
      return true;
    }
    if (activeTab === 'Topics') {
      // setIsViewingTopics(false);
      setActiveTab('Home');
      dispatch(clearBreadcrumb()); // Dispatch the action to clear the breadcrumb
      return true;
    }
    if (isViewingTalks) {
      setIsViewingTalks(false);
      dispatch(clearBreadcrumb()); // Dispatch the action to clear the breadcrumb
      return true;
    }
    if (isViewingMyFitness) {
      setIsViewingMyFitness(false);
      dispatch(clearBreadcrumb()); // Dispatch the action to clear the breadcrumb
      return true;
    }
    if (isViewingMyActivities) {
      setIsViewingMyActivities(false);
      dispatch(clearBreadcrumb()); // Dispatch the action to clear the breadcrumb
      return true;
    }
    // Logic for handling back action for top tab navigation
    if (tabHistory.length > 1) {
      // Remove the current tab from the history and set the active tab to the previous one
      const newHistory = tabHistory.slice(0, tabHistory.length - 1);
      setTabHistory(newHistory);
      setActiveTab(newHistory[newHistory.length - 1]);
      dispatch(clearBreadcrumb());
      return true;
    }
    // Logic for handling back action for footer tab navigation
    if (footerTabHistory.length > 1) {
      const newFooterHistory = footerTabHistory.slice(
        0,
        footerTabHistory.length - 1,
      );
      setFooterTabHistory(newFooterHistory);
      setActivePage(newFooterHistory[newFooterHistory.length - 1]); // assuming setActivePage changes the footer tab
      setActiveTab('Home');
      setViewControl('tabs');
      dispatch(clearBreadcrumb());

      return true; // This prevents the back button from performing the default behavior.
    }
    return false;
  };

  const [showLonelinessContent, setShowLonelinessContent] = useState(false);

  const navigateToLonelinessTopic = () => {
    setActiveTab('Topics');
    setShowLonelinessContent(true); // This will be used to control the content display in Topics and Loneliness
  };

  useEffect(() => {
    if (activeTab === 'Topics' && showLonelinessContent === true) {
      // dispatch(setBreadcrumb('Topics'));
      dispatch(setBreadcrumb('Loneliness'));
      dispatch(setBreadcrumb('How to Overcome Loneliness'));
    }
  }, [activeTab, dispatch]);

  // Reset the Loneliness Content state when the active tab changes
  useEffect(() => {
    if (activeTab !== 'Topics') {
      setShowLonelinessContent(false);
    }
  }, [activeTab]);

  useEffect(() => {
    const backAction = () => {
      if (activeTab === 'Topics' && showLonelinessContent === true) {
        setActiveTab('Home');
        return true; // This will prevent the app from closing
      }
      return false; // This will use the default back button behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [activeTab]);

  const userId = useSelector(state => state.sessionDetails.userId);

  const {popups, currentPopupIndex, isModalVisible} = useSelector(
    state => state.modal,
  );

  const [sessionPopups, setSessionPopups] = useState({});
  const [delayedPopupDisplay, setDelayedPopupDisplay] = useState(false);

  const currentPopup = popups[currentPopupIndex];

  useEffect(() => {
    const popupDelay = 300000; // 5 minutes delay: 300000 milliseconds

    const timer = setTimeout(() => {
      setDelayedPopupDisplay(true);
    }, popupDelay);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const initPopups = async () => {
      const sessionData = await AsyncStorage.getItem('sessionPopups');
      setSessionPopups(sessionData ? JSON.parse(sessionData) : {});
      dispatch(loadUserSession()).then(() => {
        if (isLoggedIn) {
          dispatch(fetchPopups());
        }
      });
    };
    initPopups();
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    const saveSessionPopups = async () => {
      await AsyncStorage.setItem(
        'sessionPopups',
        JSON.stringify(sessionPopups),
      );
    };
    saveSessionPopups();
  }, [sessionPopups]);

  const handlePopupClose = async () => {
    // Set modal visibility to false to ensure no immediate next popup
    dispatch(setModalVisibility(false));
  };

  const handlePopupSkip = async popupId => {
    setSessionPopups({...sessionPopups, [popupId]: false});
    dispatch(setModalVisibility(false));
  };

  const handlePopupSubmit = async popupId => {
    setSessionPopups({...sessionPopups, [popupId]: true});
    dispatch(setModalVisibility(false));
  };

  // Revised function to find the next popup
  const findNextPopup = () => {
    // Check if all popups have been addressed
    const allAddressed = popups.every(
      popup => sessionPopups[popup._id] !== undefined,
    );

    if (allAddressed) {
      // If all popups are addressed, reset sessionPopups and return the first popup
      setSessionPopups({});
      return popups[0];
    } else {
      // Find the first popup that hasn't been addressed
      return popups.find(popup => sessionPopups[popup._id] === undefined);
    }
  };

  useEffect(() => {
    if (isModalVisible && delayedPopupDisplay) {
      const nextPopup = findNextPopup();
      if (nextPopup) {
        const nextIndex = popups.indexOf(nextPopup);
        dispatch(setCurrentPopup(nextIndex));
      }
    }
  }, [isModalVisible, delayedPopupDisplay, sessionPopups]);

  let popupComponent = null;
  if (currentPopup && delayedPopupDisplay && !sessionPopups[currentPopup._id]) {
    switch (currentPopup.type) {
      case 'checkbox':
        popupComponent = (
          <CheckboxPopup
            userId={userId}
            data={currentPopup}
            onClose={() => handlePopupSubmit(currentPopup._id)}
            onSkip={() => handlePopupSkip(currentPopup._id)}
          />
        );
        break;
      case 'radiobutton':
        popupComponent = (
          <RadiobuttonPopup
            userId={userId}
            data={currentPopup}
            onClose={() => handlePopupSubmit(currentPopup._id)}
            onSkip={() => handlePopupSkip(currentPopup._id)}
          />
        );
        break;
      case 'textbox':
        popupComponent = (
          <TextinputPopup
            userId={userId}
            data={currentPopup}
            onClose={() => handlePopupSubmit(currentPopup._id)}
            onSkip={() => handlePopupSkip(currentPopup._id)}
          />
        );
        break;
      default:
        popupComponent = null;
    }
  }

  const renderContent = () => {
    if (isViewingSeeNew) {
      return (
        <View>
          <TouchableOpacity
            onPress={handleBackToHome}
            style={styles.backButton}>
            <Text
              style={{
                color: 'blue',
                fontSize: 14,
                fontWeight: '500',
                textDecorationLine: 'underline',
              }}>
              Back To Home
            </Text>
          </TouchableOpacity>
          <SeeNew />
        </View>
      );
    } else if (isViewingTalks) {
      return (
        <View>
          <TouchableOpacity
            onPress={handleBackToHome}
            style={styles.backButton}>
            <Text
              style={{
                color: 'blue',
                fontSize: 14,
                fontWeight: '500',
                textDecorationLine: 'underline',
              }}>
              Back To Home
            </Text>
          </TouchableOpacity>
          <Talks />
        </View>
      );
    } else if (isViewingMyFitness) {
      return (
        <View>
          <TouchableOpacity
            onPress={handleBackToHome}
            style={styles.backButton}>
            <Text
              style={{
                color: 'blue',
                fontSize: 14,
                fontWeight: '500',
                textDecorationLine: 'underline',
              }}>
              Back To Home
            </Text>
          </TouchableOpacity>
          <MyFitness />
        </View>
      );
    } else if (isViewingMyActivities) {
      return (
        <View>
          <TouchableOpacity
            onPress={handleBackToHome}
            style={styles.backButton}>
            <Text
              style={{
                color: 'blue',
                fontSize: 14,
                fontWeight: '500',
                textDecorationLine: 'underline',
              }}>
              Back To Home
            </Text>
          </TouchableOpacity>
          <MyActivities />
        </View>
      );
    }
    switch (activeTab) {
      case 'Home':
        return (
          <Home
            navigation={navigation}
            onSeeNewPress={handleSeeNewPress}
            onTopicsPress={handleTopicsPress}
            onTalksPress={handleTalksPress}
            onMyFitnessPress={handleMyFitnessPress}
            onMyActivitiesPress={handleMyActivitiesPress}
            onReadNowPress={navigateToLonelinessTopic}
          />
        );
      case 'Conversation':
        return <Conversation />;
      case 'Friend':
        return <Friends />;
      case 'Topics':
        return (
          <View>
            <Topics
              navigation={navigation}
              showLonelinessContent={showLonelinessContent}
              handleBack={handleBackToHome}
            />
          </View>
        );
      default:
        return null;
    }
  };

  const tabs = [
    {key: 'Home', title: 'Home', icon: HomeIcon},
    {key: 'Conversation', title: 'Conversation', icon: ConversationIcon},
    {key: 'Friend', title: 'Friend', icon: FriendIcon},
    {key: 'Topics', title: 'Topics', icon: TopicsIcon},
  ];

  const [activePage, setActivePage] = useState(activePageFromParams || 0);

  const handlePageChange = pageKey => {
    dispatch(clearBreadcrumb());
    setActivePage(pageKey);
    setActiveTab(null);
    setViewControl('footer');
    // Push the new page onto the footer tab history stack
    setFooterTabHistory(prevHistory => [...prevHistory, pageKey]);
  };

  useEffect(() => {
    if (activePage === 'Therapist') {
      dispatch(setBreadcrumb('Therapist'));
    } else if (activePage === 'SOS') {
      dispatch(setBreadcrumb('SOS'));
    } else if (activePage === 'Info') {
      dispatch(setBreadcrumb('Info'));
    } else if (activePage === 'MyPage') {
      dispatch(setBreadcrumb('My Page'));
    }
    // Add other conditions for different pages if needed
  }, [activePage, dispatch]);

  const [searchDataVisible, setSearchDataVisible] = useState(false);

  // Function to handle the submission of the search
  const handleSearchSubmit = () => {
    console.log(search); // Logs the current value of the search state
    // Dispatch the fetchData action with the searchKeyword
    dispatch(fetchData(search));
    // Show the modal when data is available
    setSearchDataVisible(true);
  };

  const headerSection = () => (
    <View>
      <View style={styles.searchContainer}>
        <SearchIcon name="search" style={styles.searchicon} />
        <TextInput
          style={styles.input}
          placeholder="What are you looking for?"
          placeholderTextColor="black"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearchSubmit} // Handle submission here
        />
      </View>
      <View style={styles.tabContainer}>
        {tabs.map(tab => (
          <Tab
            key={tab.key}
            title={tab.title}
            active={activeTab === tab.key}
            onPress={() => handleTabPress(tab.key)}
            icon={tab.icon}
          />
        ))}
      </View>
    </View>
  );

  // Function to render main content view
  const renderMainView = () => (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {headerSection()}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {renderContent()}
      </ScrollView>
    </View>
  );

  const renderFooterContent = () => {
    let content;
    switch (activePage) {
      case 'Therapist':
        content = <Therapist />;
        break;
      case 'SOS':
        content = <Sos />;
        break;
      case 'Info':
        content = <Info />;
        break;
      case 'MyPage':
        content = <Me />;
        break;
      default:
        content = <Home navigation={navigation} />;
    }

    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {headerSection()}
        {content}
      </View>
    );
  };

  // Define your footer tabs here
  const footerTabs = [
    {
      key: 'Therapist',
      icon: require('../assets/images/Therapist.png'),
      title: 'Therapist',
    },
    {key: 'SOS', icon: require('../assets/images/Sos.png'), title: 'SOS'},
    {key: 'Info', icon: require('../assets/images/Info.png'), title: 'Info'},
    {
      key: 'MyPage',
      icon: require('../assets/images/Webpage.png'),
      title: 'My Page',
    },
  ];

  useEffect(() => {
    const backAction = () => {
      if (isViewingSeeNew) {
        setIsViewingSeeNew(false);
        dispatch(clearBreadcrumb()); // Dispatch the action to clear the breadcrumb
        return true;
      }
      // if (activeTab === 'Topics') {
      //   // setIsViewingTopics(false);
      //   setActiveTab('Home');
      //   dispatch(clearBreadcrumb()); // Dispatch the action to clear the breadcrumb
      //   return true;
      // }
      if (isViewingTalks) {
        setIsViewingTalks(false);
        dispatch(clearBreadcrumb()); // Dispatch the action to clear the breadcrumb
        return true;
      }
      if (isViewingMyFitness) {
        setIsViewingMyFitness(false);
        dispatch(clearBreadcrumb()); // Dispatch the action to clear the breadcrumb
        return true;
      }
      if (isViewingMyActivities) {
        setIsViewingMyActivities(false);
        dispatch(clearBreadcrumb()); // Dispatch the action to clear the breadcrumb
        return true;
      }
      // Logic for handling back action for top tab navigation
      if (tabHistory.length > 1) {
        // Remove the current tab from the history and set the active tab to the previous one
        const newHistory = tabHistory.slice(0, tabHistory.length - 1);
        setTabHistory(newHistory);
        setActiveTab(newHistory[newHistory.length - 1]);
        dispatch(clearBreadcrumb());
        return true;
      }
      // Logic for handling back action for footer tab navigation
      if (footerTabHistory.length > 1) {
        const newFooterHistory = footerTabHistory.slice(
          0,
          footerTabHistory.length - 1,
        );
        setFooterTabHistory(newFooterHistory);
        setActivePage(newFooterHistory[newFooterHistory.length - 1]); // assuming setActivePage changes the footer tab
        setActiveTab('Home');
        setViewControl('tabs');
        dispatch(clearBreadcrumb());
        // if (newFooterHistory[newFooterHistory.length - 1]) {
        //   setViewControl('tabs');
        // }

        return true; // This prevents the back button from performing the default behavior.
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [
    isViewingSeeNew,
    isViewingTopics,
    isViewingTalks,
    isViewingMyFitness,
    isViewingMyActivities,
    tabHistory,
    footerTabHistory,
    dispatch,
  ]);

  useEffect(() => {
    // Dispatch the action to load user session when the Dashboard screen is loaded
    dispatch(loadUserSession());
  }, []);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible && delayedPopupDisplay}
        onRequestClose={handlePopupClose}>
        {popupComponent}
      </Modal>

      {/* Render the modal component when it's visible */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={searchDataVisible}
        onRequestClose={() => setSearchDataVisible(false)}>
        <SearchContents
          setSearchDataVisible={setSearchDataVisible}
          keyword={search}
        />
      </Modal>

      {breadcrumb && <Breadcrumb />}
      {/* Always render the main view layout when viewControl is 'tabs' */}
      {viewControl === 'tabs' && renderMainView()}
      {/* Render the footer content when viewControl is 'footer' */}
      {viewControl === 'footer' && renderFooterContent()}
      <View style={styles.footer}>
        <WaveBorder color="#FFE988" style={styles.waveBorder} />
        {footerTabs.map(tab => (
          <View style={styles.footerIcon} key={tab.key}>
            {activePage === tab.key && <View style={styles.activeIconLine} />}
            <TouchableOpacity
              style={styles.footerText}
              onPress={() => handlePageChange(tab.key)}>
              <Image source={tab.icon} style={styles.bottomicons} />
              <Text style={styles.iconName}>{tab.title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'ProximaNova-Regular',
    backgroundColor: 'white',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE988',
    borderRadius: 30,
    paddingHorizontal: 15,
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    color: '#000000',
  },
  searchicon: {
    fontSize: 20,
    marginRight: 10,
    color: '#000000',
  },
  bottomicons: {
    height: 40,
    width: 40,
  },
  icon: {
    color: 'white',
  },
  iconName: {
    fontSize: 12,
    color: '#000',
    fontWeight: '700',
    marginTop: 5,
    marginBottom: 5,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 60,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  tab: {
    alignItems: 'center', // Center the items horizontally
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  tabText: {
    color: 'black',
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  activeIndicator: {
    height: 2,
    backgroundColor: 'blue',
    marginTop: 3,
  },
  headerIcons: {
    width: 30, // or another size
    height: 30, // or another size
    marginBottom: 5,
  },
  content: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: 'black',
  },
  waveBorder: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    width: '100%',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 52,
    backgroundColor: '#FFE988',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  footerIcon: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    marginTop: -25,
    color: 'white',
    alignItems: 'center',
  },
  activeIconLine: {
    position: 'absolute',
    top: -5,
    width: 50,
    borderBottomWidth: 3,
    borderRadius: 10,
    borderColor: '#FFE988',
  },

  additionalIcon1: {
    position: 'absolute',
    bottom: 170,
    right: 20,
    backgroundColor: '#FFE988',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#000000',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  additionalIcon2: {
    position: 'absolute',
    bottom: 250,
    right: 20,
    backgroundColor: '#FFE988',
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#000000',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  additionIconText: {
    textAlign: 'center',
    color: '#000000',
    fontWeight: 'bold',
  },
  pageContent: {
    marginTop: 10,
    marginBottom: 15,
    fontSize: 16,
  },
});
