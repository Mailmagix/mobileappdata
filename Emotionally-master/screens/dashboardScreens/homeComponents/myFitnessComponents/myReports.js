import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import TypesOfReportsArray from './typesOfReportsArray';

const MyReports = () => {
  return (
    <View style={styles.container}>
      {TypesOfReportsArray.map((item, index) => (
        <View
          key={index}
          style={[styles.stressContainer, {marginTop: index === 0 ? 0 : 15}]}>
          <Text style={styles.reportHeading}>{item.title}</Text>
          <View style={styles.dataContainer}>
            <View
              style={[
                styles.dateTaken,
                {backgroundColor: item.dateTakenBackgroundColor},
              ]}>
              <Text style={{fontSize: 12, color: '#000000', fontWeight: '700'}}>
                DATE TAKEN
              </Text>
              <Text style={{fontSize: 30, fontWeight: '700', color: '#000000'}}>
                {item.date}
              </Text>
              <Text style={{fontSize: 16, fontWeight: '700', color: '#000000'}}>
                {item.month}
              </Text>
            </View>
            <View
              style={[
                styles.overallScore,
                {backgroundColor: item.overallScoreBackgroundColor},
              ]}>
              <Text style={{fontSize: 12, color: '#000000', fontWeight: '700'}}>
                OVERALL SCORE
              </Text>
              <Text style={{fontSize: 30, fontWeight: '700', color: '#000000'}}>
                {item.overallScore}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.commentSection,
              {backgroundColor: item.commentBackgroundColor},
            ]}>
            <Text style={{fontSize: 12, color: '#000000', fontWeight: '700'}}>
              COMMENT
            </Text>
            <Text
              style={{
                fontSize: 10,
                color: '#000000',
                fontWeight: '500',
                marginTop: 5,
              }}>
              {item.comment}
            </Text>
          </View>
          <TouchableOpacity style={styles.detailButton}>
            <Text style={{fontSize: 10, color: '#000000', fontWeight: '700'}}>
              SEE DETAILED REPORT
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default MyReports;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
  },
  stressContainer: {
    padding: 10,
    borderRadius: 10,
    borderBottomColor: '#00000040',
    borderTopColor: '#dee3e0',
    borderLeftColor: '#dee3e0',
    borderRightColor: '#dee3e0',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 0.5,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    paddingHorizontal: 20,
  },
  reportHeading: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '700',
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  dateTaken: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    height: 90,
    width: 140,
  },
  overallScore: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    height: 90,
    width: 140,
  },
  commentSection: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 8,
    alignItems: 'center',
  },
  detailButton: {
    alignSelf: 'center',
    backgroundColor: '#FFC524',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});
