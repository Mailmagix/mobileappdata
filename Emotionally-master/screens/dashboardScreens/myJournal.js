import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Arrows from 'react-native-vector-icons/Feather';
import Search from 'react-native-vector-icons/MaterialCommunityIcons';
import ThreeDots from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import PlusIcon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import PinIcon from 'react-native-vector-icons/AntDesign';
import TrashIcon from 'react-native-vector-icons/Feather';
import {deleteNote, pinNote, unpinNote} from '../../store/actions/notesActions';

const windowWidth = Dimensions.get('window').width;
const listItemWidth = windowWidth - 40; // Subtracting twice the marginHorizontal

const screenHeight = Dimensions.get('window').height;

const MyJournal = ({navigation}) => {
  const notes = useSelector(state => state.notes.notes);

  const formatDate = timestamp => {
    const noteDate = moment(timestamp);
    const day = noteDate.format('DD');
    const monthYear = noteDate.format('MMM YYYY');

    return (
      <Text style={{color: 'black', fontSize: 12}}>
        <Text style={{fontSize: 20, fontWeight: '700'}}>{day}</Text> {monthYear}
      </Text>
    );
  };

  const showEditor = (noteDetails = {}) => {
    navigation.navigate('JournalEditorScreen', {
      ...noteDetails,
      selectedColor: noteDetails.selectedColor || '#E5F7D0', // Default color if not provided
      audioList: noteDetails.audioList || [], // Pass the audioList
      pinned: noteDetails.pinned || false, // Pass the pinned property
    });
  };

  // Define a state variable to control the visibility of the options menu
  const [showOptionsMenu, setShowOptionsMenu] = useState([]);

  // Function to toggle the options menu for a specific note entry
  const toggleOptionsMenu = index => {
    const updatedShowOptionsMenu = [...showOptionsMenu];
    updatedShowOptionsMenu[index] = !updatedShowOptionsMenu[index];
    setShowOptionsMenu(updatedShowOptionsMenu);
  };

  const dispatch = useDispatch();

  const handleDeleteNote = id => {
    // Dispatch the deleteNote action with the ID of the note to be deleted
    dispatch(deleteNote(id));
  };

  const [pinnedNotes, setPinnedNotes] = useState([]);
  const [unpinnedNotes, setUnpinnedNotes] = useState([]);

  useEffect(() => {
    // Filter notes based on their pinned status
    const pinned = notes.filter(note => note.pinned);
    const unpinned = notes.filter(note => !note.pinned);

    setPinnedNotes(pinned);
    setUnpinnedNotes(unpinned);
  }, [notes]);

  const togglePinNote = (id, pinned) => {
    // Dispatch either pinNote or unpinNote action based on the current pinned status
    const action = pinned ? unpinNote(id) : pinNote(id);
    dispatch(action);
  };

  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.heading}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Arrows name="chevron-left" size={35} color="black" />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                fontSize: 25,
                color: 'black',
                fontWeight: '600',
              }}>
              My Journal
            </Text>
          </View>
          <Search
            name="magnify"
            size={35}
            color="black"
            style={{fontWeight: 'bold'}}
          />
        </View>
        <View style={{marginVertical: 25, alignItems: 'center'}}>
          {pinnedNotes.map((item, index) => (
            // Render pinned notes differently
            <TouchableOpacity
              key={index}
              onPress={() =>
                showEditor({
                  id: item.id || null,
                  initialHeading: item.heading || '',
                  initialContent: item.content || '',
                  selectedColor: item.selectedColor || '#E5F7D0',
                  images:
                    item.image && item.image.length > 0 ? item.image[0] : null,
                  audioList: item.audioList,
                  pinned: true,
                })
              }
              style={[
                styles.notesListPinned,
                {backgroundColor: item.selectedColor, marginBottom: 20},
                // index > 0 && {marginTop: 20},
              ]}>
              {/* Render date, heading, and solid pin icon */}
              {formatDate(item.currentDate)}
              <Text
                style={{
                  fontSize: 15,
                  color: 'black',
                  fontWeight: '600',
                  width: 170,
                }}>
                {item.heading}
              </Text>
              <TouchableOpacity onPress={() => togglePinNote(item.id, true)}>
                <PinIcon
                  name="pushpin"
                  size={25}
                  color="black"
                  style={{transform: [{rotate: '90deg'}]}}
                />
              </TouchableOpacity>
              {/* Omit other details for pinned notes */}
            </TouchableOpacity>
          ))}
          {unpinnedNotes.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                showEditor({
                  id: item.id || null,
                  initialHeading: item.heading || '',
                  initialContent: item.content || '',
                  selectedColor: item.selectedColor || '#E5F7D0',
                  images:
                    item.image && item.image.length > 0 ? item.image[0] : null,
                  audioList: item.audioList,
                  pinned: false,
                })
              }
              style={[
                styles.notesList,
                {backgroundColor: item.selectedColor},
                index > 0 && {marginTop: 20},
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'black',
                    fontWeight: '600',
                    width: 170,
                  }}>
                  {item.heading}
                </Text>
                <Text>{formatDate(item.currentDate)}</Text>

                <TouchableOpacity onPress={() => toggleOptionsMenu(index)}>
                  <ThreeDots name="more-vertical" size={20} color="black" />
                </TouchableOpacity>
              </View>

              {/* Options menu */}
              {showOptionsMenu[index] && (
                <View style={styles.optionsMenu}>
                  <TouchableOpacity
                    onPress={() => togglePinNote(item.id, item.pinned)}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}>
                    <PinIcon
                      name="pushpino"
                      size={15}
                      color="#FFE988"
                      style={{transform: [{rotate: '90deg'}]}}
                    />
                    <Text
                      style={{
                        color: '#FFE988',
                        marginLeft: 5,
                        fontSize: 12,
                        textAlign: 'left',
                      }}>
                      Pin
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDeleteNote(item.id)}
                    style={{
                      flexDirection: 'row',
                      jjustifyContent: 'flex-start',
                      marginTop: 5,
                    }}>
                    <TrashIcon name="trash-2" size={15} color="#FFE988" />
                    <Text
                      style={{color: '#FFE988', marginLeft: 5, fontSize: 12}}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.addJournalIcon}>
        <TouchableOpacity
          onPress={() =>
            showEditor({
              id: null, // Pass null for a new note
              initialHeading: '', // Initialize with empty values or as needed
              initialContent: '',
              selectedColor: '#E5F7D0',
              images: null,
            })
          }>
          <PlusIcon name="add-outline" size={45} color="#FFE988" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyJournal;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 10,
    backgroundColor: 'white',
    minHeight: screenHeight,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 20,
  },
  notesList: {
    padding: 15,
    width: listItemWidth,
    borderRadius: 15,
  },
  notesListPinned: {
    padding: 10,
    width: listItemWidth,
    borderRadius: 15,
    flexDirection: 'row', // Add flexDirection
    alignItems: 'center', // Center vertically
    justifyContent: 'space-between', // Adjust horizontal alignment as needed
  },
  journalImage: {
    height: 120,
    width: 105,
    borderRadius: 15,
  },
  addJournalIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#000000',
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsMenu: {
    position: 'absolute',
    top: 30,
    right: 15, // Adjust the right position as needed
    backgroundColor: 'black',
    borderRadius: 10,
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 1, // Ensure the menu is above other content
  },
});
