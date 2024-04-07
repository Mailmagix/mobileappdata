import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Arrows from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  CHANGE_PASSWORD_SUCCESS,
  changePassword,
  resetChangePasswordError,
} from '../../../store/actions/changePasswordActions';
import {deleteuser} from '../../../store/actions/deleteUserActions';
import {useFocusEffect} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const listItemWidth = windowWidth - 40; // Subtracting twice the marginHorizontal

const AccountDetails = ({navigation, hideAccountDetailsPage}) => {
  const [showModal, setShowModal] = useState(false);
  const [accountDeletedModal, setAccountDeletedModal] = useState(false);

  const dispatch = useDispatch();
  const changePasswordError = useSelector(
    state => state.changePasswordAuth.changePasswordError,
  );

  const changePasswordSuccess = useSelector(
    state => state.changePasswordAuth.changePasswordSuccess,
  );

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = () => {
    dispatch(changePassword(currentPassword, newPassword));
  };

  useEffect(() => {
    // Watch for changes in `changePasswordError` and update the state accordingly
    if (changePasswordError) {
      // Handle error logic here
    } else if (changePasswordSuccess) {
      // No errors, so clear the fields and show modal
      setCurrentPassword('');
      setNewPassword('');
      setShowModal(true);
    }
  }, [changePasswordError, changePasswordSuccess]);

  const isLoggedIn = useSelector(state => state.sessionDetails.isLoggedIn);
  const user = useSelector(state => state.sessionDetails.user);

  // State to manage which accordion is currently open
  const [openAccordion, setOpenAccordion] = useState(null);

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
        // Reset success status to its initial state
        dispatch({type: CHANGE_PASSWORD_SUCCESS, payload: false});
      }, 3000); //3 seconds

      return () => clearTimeout(timer); //Cleanup timer
    }
  }, [showModal]);

  const handleReset = () => {
    setCurrentPassword('');
    setNewPassword('');
    dispatch(resetChangePasswordError());
  };

  const userDeleted = useSelector(state => state.deleteUserAuth.userDeleted);

  const deletionError = useSelector(state => state.deleteUserAuth.error);

  const userId = useSelector(state => state.sessionDetails.userId);

  const handleDeleteAccount = () => {
    dispatch(deleteuser(userId));
  };

  const resetUserDeletionState = () => {
    dispatch({type: 'RESET_USER_DELETION_STATE'});
    dispatch({type: 'DELETE_USER_FAILURE'});
  };

  useEffect(() => {
    if (userDeleted) {
      setAccountDeletedModal(true);
      resetUserDeletionState();
    }
  }, [userDeleted]);

  const handleCloseModal = () => {
    setAccountDeletedModal(false);
    resetUserDeletionState();
    navigation.navigate('Login');
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(resetChangePasswordError());
    }, [dispatch]),
  );

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              The password is updated successfully!
            </Text>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={accountDeletedModal}>
        <View style={styles.centeredView}>
          <View style={styles.deleteUserModalView}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '600',
                textAlign: 'center',
              }}>
              Your account has been deleted
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                marginTop: 15,
                textAlign: 'center',
              }}>
              We’re sad to let you go.
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                marginBottom: 20,
                textAlign: 'center',
              }}>
              And hope to see you again soon
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.heading}>
        <TouchableOpacity onPress={() => hideAccountDetailsPage()}>
          <Arrows
            name="chevron-left"
            size={43}
            color="black"
            style={{fontWeight: 'bold'}}
          />
        </TouchableOpacity>
        <View style={{marginLeft: 10}}>
          <Text style={{fontSize: 25, color: 'black', fontWeight: '600'}}>
            Edit Account Details
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.inputField}
            editable={false}
            value={isLoggedIn && user ? user.name : ''}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email address</Text>
          <TextInput
            style={styles.inputField}
            keyboardType="email-address"
            editable={false}
            value={isLoggedIn && user ? user.email : ''}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            setOpenAccordion(openAccordion === 'password' ? null : 'password')
          }>
          <Text
            style={[
              styles.accordionHeader,
              openAccordion === 'password' ? styles.accordionHeaderActive : {},
            ]}>
            Change Password
          </Text>
        </TouchableOpacity>
        {openAccordion === 'password' && (
          <View style={styles.accordionContent}>
            {changePasswordError && (
              <Text style={{color: 'red', marginTop: 10}}>
                {changePasswordError}
              </Text>
            )}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Current Password</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Enter Current Password"
                placeholderTextColor="#80BBB7"
                value={currentPassword}
                onChangeText={text => setCurrentPassword(text)}
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>New Password</Text>
              <TextInput
                style={styles.inputField}
                placeholder="Enter New Password"
                placeholderTextColor="#80BBB7"
                value={newPassword}
                onChangeText={text => setNewPassword(text)}
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleChangePassword}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, {marginLeft: 10}]}
                onPress={handleReset}>
                <Text style={styles.saveButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        <TouchableOpacity
          onPress={() =>
            setOpenAccordion(openAccordion === 'delete' ? null : 'delete')
          }>
          <Text
            style={[
              styles.accordionHeader,
              openAccordion === 'delete' ? styles.accordionHeaderActive : {},
            ]}>
            Delete my Account
          </Text>
        </TouchableOpacity>
        {openAccordion === 'delete' && (
          <View style={styles.accordionContent}>
            {/* Your Delete Account content goes here */}
            <View style={{marginTop: 10}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  lineHeight: 20,
                }}>
                If you delete your account, you will lose all your personal data
                which cannot be recovered. Deleting your account will not cancel
                any active subscriptions you have with Apple or Google.
              </Text>
              <View style={styles.confirmDeletion}>
                <Text style={{color: 'black', fontSize: 15, fontWeight: '500'}}>
                  Are you sure you want to delete your account?
                </Text>
                {deletionError && (
                  <Text style={{color: 'red', marginVertical: 10}}>
                    {deletionError}
                  </Text>
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginVertical: 15,
                  }}>
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={handleDeleteAccount}>
                    <Text style={styles.confirmButtonText}>YES</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.confirmButton, {marginLeft: 15}]}
                    onPress={() => setOpenAccordion(null)}>
                    <Text style={styles.confirmButtonText}>NO</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default AccountDetails;

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  body: {
    marginVertical: 20,
    alignSelf: 'center',
    width: listItemWidth,
  },
  fieldContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
    color: 'black',
  },
  inputField: {
    height: 40,
    borderColor: '#d9d7d7',
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: '#D6F7F5',
    borderTopWidth: 2,
    borderWidth: 0.5,
    color: 'black',
  },
  accordionHeader: {
    color: 'black',
    fontSize: 15,
    textDecorationLine: 'underline',
    marginTop: 10,
    fontWeight: '600',
  },
  accordionHeaderActive: {
    color: '#80BBB7', // Change this color based on your preference
  },
  saveButton: {
    backgroundColor: '#FFE988',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  saveButtonText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
  },
  confirmDeletion: {
    marginVertical: 20,
  },
  confirmButton: {
    backgroundColor: '#63D9A0',
    height: 45,
    width: 100,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 20,
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // This makes background a little transparent
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: 250,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  deleteUserModalView: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    width: 300,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  closeButton: {
    backgroundColor: '#63D9A0',
    height: 35,
    width: 100,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 18,
    justifyContent: 'center',
  },
});
