import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Arrows from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import PinIcon from 'react-native-vector-icons/AntDesign';
import TrashIcon from 'react-native-vector-icons/Feather';
import MicroPhoneIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import VideoIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CircleIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CloseIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SquareIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  addorUpdateNote,
  addNote,
  deleteNote,
  unpinNote,
  pinNote,
} from '../../../store/actions/notesActions';
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';
import AudioListItem from './audioListItem';
import moment from 'moment';
import DeleteConfirmationModal from './deleteConfirmationModal ';
import {readFile} from 'react-native-fs';
import cheerio from 'cheerio';

const dirs = RNFetchBlob.fs.dirs;

const screenHeight = Dimensions.get('window').height;

const windowWidth = Dimensions.get('window').width;
const pageWidth = windowWidth - 40; // Subtracting twice the marginHorizontal

const audioRecorderPlayer = new AudioRecorderPlayer();

const JournalEditorScreen = ({route, navigation}) => {
  const {
    id,
    initialHeading,
    initialContent,
    audioList: initialAudioList,
  } = route.params;
  const [pinned, setPinned] = useState(!!route.params.pinned);
  const dispatch = useDispatch();
  const richText = useRef();
  const [content, setContent] = useState(initialContent || '');

  const [heading, setHeading] = useState(initialHeading || '');

  const [currentDate, setCurrentDate] = useState('');

  const [image, setImage] = useState(route.params.images || []);

  const createImageHTML = imageDataUrl => {
    const imageId = `img_${new Date().getTime()}`;

    const htmlContent = `
    <div contenteditable="false" id="${imageId}" style="position: relative; margin-top: 10px; margin-bottom: 20px;" data-image-id="${imageId}">
      <img src="${imageDataUrl}" style="width: 100%; height: 200px; border-radius: 20px;" />
      <div contenteditable="false" style="position: absolute; top: 10px; right: 15px; background-color: black; border-radius: 50%; width: 25px; height: 25px; display: flex; justify-content: center; align-items: center; cursor: pointer;"
      onclick="(function(event){
        window.ReactNativeWebView.postMessage(JSON.stringify({action: 'removeImage', target: '${imageId}'}));
        event.stopPropagation();
      })(event);">
        <span style="color: white;">X</span>
      </div>
    </div>
    <br/>`;
    return {htmlContent, imageId};
  };

  const handleImageUpload = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      width: pageWidth,
      height: 200,
      cropping: true,
    })
      .then(async response => {
        if (response.path) {
          try {
            // Read the image file as a base64-encoded string
            const base64String = await readFile(response.path, 'base64');
            const dataUrl = `data:image/jpeg;base64,${base64String}`;

            // Create HTML content with the image
            const {htmlContent, imageId} = createImageHTML(dataUrl); // this function creates the HTML as shown earlier

            // Insert the HTML into the RichEditor
            richText.current?.insertHTML(htmlContent);

            setContent(prevHtml => prevHtml + htmlContent);
          } catch (error) {
            console.log('File reading error:', error);
          }
        }
      })
      .catch(err => {
        console.log('Image Picker error:', err);
      });
  };

  const createVideoHTML = videoPath => {
    // Example HTML embedding the video - adjust according to your needs
    const videoId = `video_${new Date().getTime()}`;
    const htmlContent = `
    <div id="${videoId}" style="position: relative; margin-top: 10px; margin-bottom: 20px;" data-video-id="${videoId}">
      <video controls style="width: 100%; max-height: 300px;">
        <source src="data:video/mp4;base64, ${videoPath}" type="video/mp4">
      </video>
      <div contenteditable="false" style="position: absolute; top: 10px; right: 15px; background-color: black; border-radius: 50%; width: 25px; height: 25px; display: flex; justify-content: center; align-items: center; cursor: pointer;"
      onclick="(function(event){
        window.ReactNativeWebView.postMessage(JSON.stringify({action: 'removeVideo', target: '${videoId}'}));
        event.stopPropagation();
      })(event);">
        <span style="color: white;">X</span>
      </div>
    </div>
    <br/>`;
    return {htmlContent, videoId};
  };

  const handleVideoUpload = () => {
    ImagePicker.openPicker({
      mediaType: 'video', // Specify the media type to video
      width: pageWidth,
    })
      .then(video => {
        console.log(video);
        const videoPath = video.path; // Get the path of the selected video
        // Generate HTML for the video
        const {htmlContent, videoId} = createVideoHTML(videoPath); // You need to define this function
        // Insert the HTML into the RichEditor
        richText.current?.insertHTML(htmlContent);

        setContent(prevHtml => prevHtml + htmlContent);
      })
      .catch(error => {
        console.log('Video picker error:', error);
      });
  };

  const handleEditorContentChange = newContent => {
    setContent(newContent); // Storing the current HTML content in state
  };

  const rebuildEditorContentWithoutImage = imageIdToRemove => {
    // Load your content into cheerio
    const $ = cheerio.load(content, null, false);

    // Find the element by the data attribute and remove it
    $(`div[data-image-id="${imageIdToRemove}"]`).remove();

    // Get the updated HTML
    const updatedHtmlContent = $.html();

    // Update the state and the editor content
    setContent(updatedHtmlContent);

    if (richText.current) {
      richText.current.setContentHTML(updatedHtmlContent);
    } else {
      console.error(
        'Editor ref is not attached or the component is not yet mounted.',
      );
    }
  };

  const rebuildEditorContentWithoutVideo = videoIdToRemove => {
    // Load your content into cheerio
    const $ = cheerio.load(content, null, false);

    // Find the element by the data attribute and remove it
    $(`div[data-video-id="${videoIdToRemove}"]`).remove();

    // Get the updated HTML
    const updatedHtmlContent = $.html();

    // Update the state and the editor content
    setContent(updatedHtmlContent);

    if (richText.current) {
      richText.current.setContentHTML(updatedHtmlContent);
    } else {
      console.error(
        'Editor ref is not attached or the component is not yet mounted.',
      );
    }
  };

  const onWebViewMessage = event => {
    try {
      // Parsing the event if it's stringified, as is typical in a WebView postMessage scenario.
      // If your setup doesn't require this because 'event' is already the object you need,
      // you would adjust accordingly, as it seems you have.
      const messageData = typeof event === 'string' ? JSON.parse(event) : event;

      // Check if the 'action' is what we expect, and it's 'removeImage'.
      if (messageData.action === 'removeImage') {
        console.log(
          'Received message to remove image with ID:',
          messageData.target,
        );
        rebuildEditorContentWithoutImage(messageData.target);
      }
      if (messageData.action === 'removeVideo') {
        console.log(
          'Received message to remove video with ID:',
          messageData.target,
        );
        rebuildEditorContentWithoutVideo(messageData.target);
      }
    } catch (error) {
      console.error('Error handling message from WebView:', error);
    }
  };

  const generateUniqueId = () => {
    return new Date().getTime().toString();
  };

  const [isSaving, setIsSaving] = useState(false); // Add a state variable to track save operation

  const handleSaveJournal = async pinned => {
    try {
      // If save operation is already in progress, return early
      if (isSaving) {
        return;
      }

      setIsSaving(true); // Set save operation in progress

      if (id) {
        // Update existing journal entry
        await dispatch(
          addorUpdateNote(
            id,
            heading,
            content,
            image ? [image.path] : [],
            audioList,
            selectedColor,
            moment().format(),
            pinned,
          ),
        );
      } else {
        // Create a new journal entry with a unique ID
        if (heading.trim() !== '' || content.trim() !== '') {
          const newJournalEntry = {
            id: generateUniqueId(),
            heading,
            content,
            image: image ? [image.path] : [],
            audioList,
            selectedColor,
            currentDate: moment().format(),
            pinned,
          };
          await dispatch(addNote(newJournalEntry));
        }
      }

      setIsSaving(false); // Clear save operation status

      // After saving, you can navigate back or perform any other action
      navigation.goBack();
    } catch (error) {
      console.error('Error saving note:', error);
      setIsSaving(false); // Clear save operation status in case of an error
    }
  };

  const [isRecording, setIsRecording] = useState(false);
  const [audioPath, setAudioPath] = useState('');
  const [recordSecs, setRecordSecs] = useState(0);
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [audioList, setAudioList] = useState(initialAudioList || []);

  const stopRecorder = async () => {
    await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
  };

  const stopRecording = async () => {
    await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    const newAudio = {
      path: audioPath,
      duration: recordSecs,
      currentPosition: 0,
    };
    setAudioList(prevAudioList => [...prevAudioList, newAudio]);
    setIsRecording(false);
  };

  const recordAudio = async () => {
    console.log('Here');
    if (!isRecording) {
      const timestamp = new Date().getTime(); // Generate a unique timestamp
      const path = Platform.select({
        ios: `hello_${timestamp}.m4a`,
        android: `${dirs.CacheDir}/hello_${timestamp}.mp3`,
      });

      const audioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberOfChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
      };
      const meteringEnabled = false;

      await audioRecorderPlayer.startRecorder(path, audioSet, meteringEnabled);
      audioRecorderPlayer.addRecordBackListener(e => {
        // You can update the UI here to indicate recording duration
        console.log('Event Object:', e);
        const recordSecsInSec = Math.floor(e.currentPosition / 1000);
        setRecordSecs(recordSecsInSec);
        return;
      });
      setAudioPath(path);
      setIsRecording(true);
    }
  };

  const playBackListener = useRef(null); // Declare a variable to hold the playBackListener

  const onStartPlay = async index => {
    // Stop player and remove any previous listener
    audioRecorderPlayer.stopPlayer();
    if (
      playBackListener.current &&
      typeof playBackListener.current.remove === 'function'
    ) {
      playBackListener.current.remove();
      console.log('Successfully removed listener');
    } else {
      console.log('Could not remove listener:', playBackListener.current);
    }
    playBackListener.current = null;

    try {
      // const msg = await audioRecorderPlayer.startPlayer(uri);
      // console.log('Message:', msg); // Log message to make sure it's not undefined
      playBackListener.current = audioRecorderPlayer.addPlayBackListener(e => {
        if (e.currentPosition !== 0) {
          const currentPositionInSec = Math.floor(e.currentPosition / 1000);

          //Update currentPosition in state
          setCurrentPositionSec(currentPositionInSec);

          setAudioList(prevAudioList => {
            const newAudioList = [...prevAudioList];
            newAudioList[index] = {
              ...newAudioList[index],
              currentPosition: currentPositionInSec,
            };
            return newAudioList;
          });
        }

        // Conditionally remove the listener if playback is done
        if (e.currentPosition >= e.duration) {
          if (
            playBackListener.current &&
            typeof playBackListener.current.remove === 'function'
          ) {
            playBackListener.current.remove();
            playBackListener.current = null;
          }
        }
      });
    } catch (error) {
      console.error('There was an error playing:', error);
    }
  };

  const onDelete = index => {
    // Remove the audio item at the specified index from the audioList
    const newAudioList = [...audioList];
    newAudioList.splice(index, 1);
    setAudioList(newAudioList);
  };

  useEffect(() => {
    //Get current date
    const date = new Date();
    const formattedDate = moment(date).format('DD MMM YYYY');
    setCurrentDate(formattedDate);

    return () => {
      audioRecorderPlayer.stopPlayer(); // Added this line
      stopRecorder();
    };
  }, []);

  const MicroPhone = () => (
    <MicroPhoneIcon name="microphone-outline" size={25} color="black" />
  );

  const VideoPick = () => (
    <VideoIcon name="video-outline" size={25} color="black" />
  );

  const [showColorPickerRow, setShowColorPickerRow] = useState(false);

  const handleChangeBgColor = () => {
    // Your logic here to change the background color
    setShowColorPickerRow(!showColorPickerRow);
  };

  const [selectedColor, setSelectedColor] = useState(
    route.params.selectedColor || '#E5F7D0',
  );

  const Circle = () => (
    <CircleIcon name="circle" size={25} color={selectedColor} />
  );

  // Added a custom function to format the record time
  const formatTime = secs => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    // Handle the delete action here
    if (id) {
      // Handle the delete action here using 'id'
      dispatch(deleteNote(id));
      setShowDeleteModal(false);
      navigation.goBack();
    }
  };

  const togglePin = () => {
    // Toggle pin status in Redux state
    setPinned(!pinned);
    // Dispatch an action to update the pinned status in Redux
    dispatch(pinned ? unpinNote(id) : pinNote(id)); // Assuming you have corresponding actions

    // // Pass the updated pinned status back to MyJournal
    // navigation.navigate('MyJournal', {id, pinned: !pinned}, {route});
    // Update the pinned status in the route parameters
    navigation.setParams({id, pinned: !pinned});
  };

  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          ...styles.container,
          backgroundColor: selectedColor,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Arrows name="chevron-left" size={35} color="black" />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={togglePin}>
              <PinIcon
                name={pinned ? 'pushpin' : 'pushpino'}
                size={25}
                color="black"
                style={{transform: [{rotate: '90deg'}]}}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowDeleteModal(true)}>
              <TrashIcon
                name="trash-2"
                size={25}
                color="black"
                style={{marginLeft: 15}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => handleSaveJournal(pinned)}
              disabled={isSaving} // Disable the button if saving or loading
            >
              {isSaving ? (
                <ActivityIndicator size="small" color="black" />
              ) : (
                <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
                  SAVE
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginVertical: 25, marginHorizontal: 20}}>
          <Text style={{color: 'black', fontSize: 12}}>
            <Text style={{fontSize: 20, fontWeight: '700'}}>
              {currentDate.split(' ')[0]}{' '}
            </Text>
            {`${currentDate.split(' ').slice(1).join(' ')}`}
          </Text>
          <TextInput
            placeholder="Heading"
            placeholderTextColor={'#abaaa9'}
            value={heading}
            onChangeText={text => setHeading(text)}
            multiline
            style={styles.headingInput}
          />
          {/* Add this block to render the selected image */}
          {/* {image && image.path && (
            <View style={{marginBottom: 20}}>
              <Image
                source={{uri: image.path}}
                style={{width: pageWidth, height: 200, borderRadius: 10}}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={styles.closeIconContainer}
                onPress={removeImage}>
                <CloseIcon name="close" size={15} color="white" />
              </TouchableOpacity>
            </View>
          )} */}
          <RichEditor
            ref={richText}
            placeholder="Enter Description..."
            placeholderColor={'#abaaa9'}
            initialContentHTML={initialContent}
            // onChange={text => setContent(text)}
            editorInitializedCallback={() => console.log('Editor initialized')}
            editorStyle={{backgroundColor: 'transparent'}}
            onMessage={onWebViewMessage}
            onChange={handleEditorContentChange}
          />
          {isRecording && (
            <View style={{alignItems: 'center', marginVertical: 20}}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 45,
                  backgroundColor: '#d13921',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  {formatTime(recordSecs)}
                  {/* Display the recording seconds in the middle of the circle */}
                </Text>
                <TouchableOpacity
                  style={{marginTop: 10}}
                  onPress={stopRecording}>
                  <SquareIcon name="square" size={25} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {audioList.map((audio, index) => (
            <View key={index}>
              <Text style={{color: 'black'}}>Audio Clip {index + 1}</Text>
              <AudioListItem
                key={index}
                audio={audio}
                index={index}
                onStartPlay={onStartPlay}
                onDelete={onDelete}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <DeleteConfirmationModal
        visible={showDeleteModal}
        onDelete={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      {showColorPickerRow && (
        <View style={styles.colorPicker}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setSelectedColor('#E5F7D0')}>
            <CircleIcon name="circle" size={25} color="#E5F7D0" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setSelectedColor('#F6D4E6')}>
            <CircleIcon name="circle" size={25} color="#F6D4E6" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setSelectedColor('#D4F7E2')}>
            <CircleIcon name="circle" size={25} color="#D4F7E2" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setSelectedColor('#D6F7F5')}>
            <CircleIcon name="circle" size={25} color="#D6F7F5" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setSelectedColor('#FFCFA8')}>
            <CircleIcon name="circle" size={25} color="#FFCFA8" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setSelectedColor('#FFE988')}>
            <CircleIcon name="circle" size={25} color="#FFE988" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setSelectedColor('#E9DBF9')}>
            <CircleIcon name="circle" size={25} color="#E9DBF9" />
          </TouchableOpacity>
        </View>
      )}
      <RichToolbar
        style={styles.stickyRow}
        getEditor={() => richText.current}
        iconTint={'#000'}
        selectedIconTint={'#2095F2'} // Color when icon is selected
        disabledIconTint={'#8b8b8b'}
        actions={[
          actions.setBold,
          actions.setItalic,
          actions.setUnderline,
          actions.setStrikethrough,
          'recordAudio',
          actions.insertImage,
          'pickVideo',
          'changeBgColor',
        ]}
        iconMap={{
          recordAudio: () => <MicroPhone />,
          changeBgColor: () => <Circle />,
          pickVideo: () => <VideoPick />,
        }}
        onPressAddImage={handleImageUpload}
        recordAudio={recordAudio}
        changeBgColor={handleChangeBgColor}
        pickVideo={handleVideoUpload}
      />
    </View>
  );
};

export default JournalEditorScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 10,
    minHeight: screenHeight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 20,
  },
  saveButton: {
    backgroundColor: '#63D9A0',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 75,
    marginLeft: 15,
  },
  headingInput: {
    fontSize: 20, // Set the desired font size
    fontWeight: '600',
    color: 'black',
  },
  contentInput: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'justify',
  },
  stickyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    padding: 5,
  },
  colorPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    position: 'absolute',
    bottom: 70,
    padding: 5,
    width: 260,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  closeIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#5c5e5d',
    borderRadius: 12,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
