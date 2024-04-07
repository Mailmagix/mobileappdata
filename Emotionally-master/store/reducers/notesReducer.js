import {
  ADD_OR_UPDATE_NOTE,
  DELETE_NOTE,
  PIN_NOTE,
  UNPIN_NOTE,
} from '../actions/notesActions';

const initialState = {
  notes: [],
};

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_OR_UPDATE_NOTE: {
      const {
        id,
        heading,
        content,
        image,
        audioList,
        selectedColor,
        currentDate,
        pinned, // Add pinned property to the action payload
      } = action.payload;
      const existingNoteIndex = state.notes.findIndex(note => note.id === id);

      if (existingNoteIndex !== -1) {
        const updatedNotes = [...state.notes];
        updatedNotes[existingNoteIndex] = {
          id,
          heading,
          content,
          image,
          audioList,
          selectedColor,
          currentDate,
          pinned: pinned || updatedNotes[existingNoteIndex].pinned,
        };
        return {...state, notes: updatedNotes};
      } else {
        return {
          ...state,
          notes: [
            ...state.notes,
            {
              id,
              heading,
              content,
              image,
              audioList,
              selectedColor,
              currentDate,
              pinned: pinned || false,
            },
          ],
        };
      }
    }
    case PIN_NOTE: {
      const idToPin = action.payload;
      const updatedNotes = state.notes.map(note => {
        if (note.id === idToPin) {
          return {...note, pinned: true};
        }
        return note;
      });
      return {...state, notes: updatedNotes};
    }
    case UNPIN_NOTE: {
      const idToUnpin = action.payload;
      const updatedNotes = state.notes.map(note => {
        if (note.id === idToUnpin) {
          return {...note, pinned: false};
        }
        return note;
      });
      return {...state, notes: updatedNotes};
    }
    case DELETE_NOTE: {
      const idToDelete = action.payload;
      const updatedNotes = state.notes.filter(note => note.id !== idToDelete);
      return {...state, notes: updatedNotes};
    }
    default:
      return state;
  }
};

export default notesReducer;
