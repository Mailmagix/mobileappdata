import AsyncStorage from '@react-native-async-storage/async-storage';

export const ADD_OR_UPDATE_NOTE = 'ADD_OR_UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const PIN_NOTE = 'PIN_NOTE';
export const UNPIN_NOTE = 'UNPIN_NOTE';

export const addorUpdateNote = (
  id,
  heading,
  content,
  image,
  audioList,
  selectedColor,
  currentDate,
) => {
  return async dispatch => {
    // Dispatch action to update Redux store
    dispatch({
      type: ADD_OR_UPDATE_NOTE,
      payload: {
        id,
        heading,
        content,
        image,
        audioList,
        selectedColor,
        currentDate,
      },
    });

    // Store the updated data in AsyncStorage
    const journalData = {
      id,
      heading,
      content,
      image,
      audioList,
      selectedColor,
      currentDate,
    };

    try {
      // Store the journal data in AsyncStorage
      await AsyncStorage.setItem(`journal_${id}`, JSON.stringify(journalData));
    } catch (error) {
      console.error(`Error storing journal data in AsyncStorage:`, error);
    }
  };
};

//Add a new note action
export const addNote = newJournalEntry => ({
  type: ADD_OR_UPDATE_NOTE,
  payload: newJournalEntry,
});

//Delete a note
export const deleteNote = id => {
  return async dispatch => {
    // Dispatch action to delete note from Redux store
    dispatch({
      type: DELETE_NOTE,
      payload: id,
    });

    // Remove the note data from AsyncStorage
    try {
      await AsyncStorage.removeItem(`journal_${id}`);
    } catch (error) {
      console.error(`Error removing journal data from AsyncStorage:`, error);
    }
  };
};

export const pinNote = id => ({
  type: PIN_NOTE,
  payload: id,
});

export const unpinNote = id => ({
  type: UNPIN_NOTE,
  payload: id,
});
