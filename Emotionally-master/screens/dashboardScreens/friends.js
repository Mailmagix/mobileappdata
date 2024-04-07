import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Invite from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import PlusIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FriendsListArray from './friendsComponents/friendsListArray';

const Friends = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const FriendsList = ({name, image}) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={image} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
        </View>
        <TouchableOpacity style={styles.followIcon}>
          <PlusIcon name="plus-circle" size={30} color="blue" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.inviteButton} onPress={openModal}>
        <Invite
          name="account-plus"
          size={20}
          color="white"
          style={{fontWeight: '500'}}
        />
        <Text style={styles.buttonText}>Invite Friends</Text>
      </TouchableOpacity>

      <View style={styles.friends}>
        {FriendsListArray.map(item => (
          <FriendsList key={item.id} name={item.name} image={item.image} />
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Invite Via</Text>
            <View style={styles.socialIconContainer}>
              <TouchableOpacity
                onPress={() => {
                  /* Your Facebook share logic */
                }}>
                <Icon name="facebook" size={40} color="#3b5998" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  /* Your WhatsApp share logic */
                }}>
                <Icon name="whatsapp" size={40} color="#25D366" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  /* Your Contacts logic */
                }}>
                <Icon name="address-book" size={40} color="#000000" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={closeModal}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Friends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inviteButton: {
    backgroundColor: '#3f81eb',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 15,
    // padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
    fontWeight: '600',
    fontSize: 18,
  },
  socialIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 20,
    alignSelf: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    // alignSelf: 'center',
  },
  textContainer: {
    flex: 1, // Allow text to expand and push the plus icon to the right
    justifyContent: 'center', // Vertically center the text
  },

  friends: {
    paddingBottom: 30,
  },
});
