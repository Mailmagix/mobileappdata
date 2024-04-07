import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import React, {useState} from 'react';
import SearchIcon from 'react-native-vector-icons/FontAwesome';

const Sos = () => {
  const [search, setSearch] = useState('');
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        <SearchIcon name="search" style={styles.searchicon} />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="black"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <Text style={styles.heading}>Emergency contact numbers list:</Text>
      <View style={styles.contactNumbers}>
        <View style={styles.row}>
          <View style={styles.nameContainer}>
            <Text style={styles.tableHeading}>Name</Text>
          </View>
          <View style={styles.numbersContainer}>
            <Text style={styles.tableHeading}>Contact Number</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Oliver Jake</Text>
          </View>
          <View style={styles.numbersContainer}>
            <Text style={styles.numbers}>+913722715898</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Jack Connor</Text>
          </View>
          <View style={styles.numbersContainer}>
            <Text style={styles.numbers}>+918002798148</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Harry Callum</Text>
          </View>
          <View style={styles.numbersContainer}>
            <Text style={styles.numbers}>+913816610636</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Jacob</Text>
          </View>
          <View style={styles.numbersContainer}>
            <Text style={styles.numbers}>+913370506898</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Charlie Kyle</Text>
          </View>
          <View style={styles.numbersContainer}>
            <Text style={styles.numbers}>+912334797708</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Thomas Joe</Text>
          </View>
          <View style={styles.numbersContainer}>
            <Text style={styles.numbers}>+911155710478</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>George Reece</Text>
          </View>
          <View style={styles.numbersContainer}>
            <Text style={styles.numbers}>+918778911902</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Oscar Rhys</Text>
          </View>
          <View style={styles.numbersContainer}>
            <Text style={styles.numbers}>+913543088531</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>James Charlie</Text>
          </View>
          <View style={styles.numbersContainer}>
            <Text style={styles.numbers}>+916501888976</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>William Damian</Text>
          </View>
          <View style={styles.numbersContainer}>
            <Text style={styles.numbers}>+918671928376</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Sos;

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: 90,
    flexGrow: 1,
    fontFamily: 'ProximaNova-Regular',
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
  heading: {
    fontSize: 20,
    paddingHorizontal: 20,
    color: 'black',
    textAlign: 'center',
    fontWeight: '600',
  },
  content: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: 'black',
  },
  tableHeading: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    textAlign: 'left',
    padding: 10,
  },
  contactNumbers: {
    marginTop: 20,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1, // Add bottom border to each row
    borderColor: 'black',
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRightWidth: 1, // Add right border for the vertical line
    borderColor: 'black',
  },
  numbersContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    color: 'black',
    padding: 10,
  },
  numbers: {
    fontSize: 15,
    paddingVertical: 5,
    color: 'blue',
    padding: 10,
  },
});
