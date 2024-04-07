import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import React from 'react';

const windowWidth = Dimensions.get('window').width;
const pageWidth = windowWidth - 40; // Subtracting twice the marginHorizontal

const DeleteConfirmationModal = ({visible, onDelete, onCancel}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => onCancel()}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              textAlign: 'center',
              fontWeight: '700',
              paddingHorizontal: 10,
            }}>
            Are you sure you want to delete this?
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.noButton}
              onPress={() => onCancel()}>
              <Text style={styles.buttonText}>NO</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.yesButton}
              onPress={() => onDelete()}>
              <Text style={styles.buttonText}>YES</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteConfirmationModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: pageWidth - 20,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  noButton: {
    backgroundColor: '#FF8E4F',
    padding: 10,
    borderRadius: 25,
    marginRight: 10,
    width: 100,
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#63D9A0',
    padding: 10,
    borderRadius: 25,
    width: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
