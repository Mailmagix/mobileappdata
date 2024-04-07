import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  BackHandler,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Svg, {Polygon} from 'react-native-svg';

const Breadcrumb = () => {
  const breadcrumbs = useSelector(state => state.navigation.breadcrumbs);
  const windowWidth = Dimensions.get('window').width;

  if (!breadcrumbs || breadcrumbs.length === 0) return null; // or some other handling if no breadcrumb

  const maxSteps = 3;

  // Calculate the filled portion of the progress bar
  const filledWidth = (breadcrumbs.length / maxSteps) * windowWidth; // maxSteps should be the maximum number of steps you expect

  // Render breadcrumb items with the last item bold
  const renderBreadcrumbText = () => {
    return breadcrumbs.map((item, index) => {
      const isLastItem = index === breadcrumbs.length - 1;
      return (
        <Text
          key={index}
          style={[
            styles.breadcrumbText,
            isLastItem ? styles.lastBreadcrumbText : null,
          ]}>
          {item}
          {index < breadcrumbs.length - 1 ? ' / ' : ''}
        </Text>
      );
    });
  };

  return (
    <View style={styles.breadcrumbContainer}>
      {/* Filled portion */}
      <View style={[styles.progressBarFilled, {width: filledWidth - 20}]}>
        {/* Text content inside the progress bar */}
        <Text style={styles.breadcrumbTextContainer}>
          {renderBreadcrumbText()}
        </Text>
        <Svg
          height="90"
          width="30" // Width of the SVG container, adjust as needed
          style={styles.svgContainer}>
          <Polygon
            points="0,0 30,20 0,40" // Coordinates of the arrow points
            fill="#63D9A0" //Color of the arrow, same as progressBarFilled
          />
        </Svg>
      </View>
    </View>
  );
};

export default Breadcrumb;

const styles = StyleSheet.create({
  breadcrumbContainer: {
    marginTop: 5,
    marginBottom: 5,
    position: 'relative',
    width: '100%',
    backgroundColor: '#D4F7E2', // light green
    paddingVertical: 15,
    justifyContent: 'center',
  },
  progressBarFilled: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#63D9A0', // Background color for the filled portion
    justifyContent: 'center',
    paddingLeft: 10,
    overflow: 'visible',
  },
  svgContainer: {
    position: 'absolute',
    right: -22, // Adjust so the arrow is positioned correctly
    top: -5,
  },
  breadcrumbTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  breadcrumbText: {
    color: 'black',
    fontSize: 13,
  },
  lastBreadcrumbText: {
    fontWeight: 'bold',
  },
});
