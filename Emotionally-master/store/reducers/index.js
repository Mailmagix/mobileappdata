import {combineReducers} from 'redux';

// Import your individual reducers
import authReducer from './authReducer';
import userReducer from './userReducer';
import signUpOtpReducer from './signUpOtpReducer';
import changePasswordReducer from './changePasswordReducer';
import deleteUserReducer from './deleteUserReducer';
import notesReducer from './notesReducer';
import audioReducer from './audioReducer';
import selectedOptionsReducer from './selectedOptionsReducer';
import videoReducer from './videoLibraryReducer';
import articleReducer from './articleLibraryReducer';
import topDiscussionsReducer from './topDiscussionsReducer';
import topicsReducer from './topicsLibraryReducer';
import sessionStorageReducer from './sessionStorageReducer';
import likedAudiosReducer from './likedAudiosReducer';
import likedVideosReducer from './likedVideosReducer';
import likedArticlesReducer from './likedArticlesReducer';
import likedItemsReducer from './likedItemsReducer';
import breadcrumbReducer from './breadcrumbReducer';
import {modalReducer} from './popupReducer';
import searchReducer from './searchReducer';

// Combine all your reducers using combineReducers
const rootReducer = combineReducers({
  auth: authReducer,
  sessionDetails: sessionStorageReducer,
  user: userReducer,
  otpAuth: signUpOtpReducer,
  changePasswordAuth: changePasswordReducer,
  deleteUserAuth: deleteUserReducer,
  notes: notesReducer,
  audios: audioReducer,
  selectedOptions: selectedOptionsReducer,
  videos: videoReducer,
  articles: articleReducer,
  discussions: topDiscussionsReducer,
  topics: topicsReducer,
  likedAudios: likedAudiosReducer,
  likedVideos: likedVideosReducer,
  likedArticles: likedArticlesReducer,
  likedItems: likedItemsReducer,
  navigation: breadcrumbReducer,
  modal: modalReducer,
  search: searchReducer,
});

export default rootReducer;
