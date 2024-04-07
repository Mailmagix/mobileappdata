import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  Animated,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Sound from 'react-native-sound';
import FastImage from 'react-native-fast-image';

// const soundFile = require('../../assets/sounds/canon.mp3');
const soundFile =
  'https://audios-emotionally.s3.amazonaws.com/f6e57ba9-83dc-4838-b8dd-a48c599f7882-canon.mp3';
const explosionGIF = require('../../assets/images/fire.gif');

const Bullet = ({position, onBulletHide, onBulletHit}) => {
  const handleBulletHide = () => {
    onBulletHide();
  };

  return (
    <Animated.View
      style={[
        {
          width: 50,
          height: 60,
          backgroundColor: 'black',
          alignSelf: 'center',
          marginTop: position,
          borderRadius: 35,
        },
        styles.bullet,
      ]}>
      <View onLayout={handleBulletHide} />
    </Animated.View>
  );
};

const AngerShooting = ({image}) => {
  const [bullets, setBullets] = useState([]);
  const [showExplosion, setShowExplosion] = useState(false); // State to control explosion visibility

  const shootSound = useRef(
    new Sound(soundFile, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load the sound', error);
      }
    }),
  ).current;

  useEffect(() => {
    Sound.setCategory('Playback'); // Enable sound playback in the app

    return () => {
      shootSound.release(); // Release the sound when the component unmounts
    };
  }, [shootSound]);

  const rotateAnimation = useRef(new Animated.Value(0)).current;
  const personImageOpacity = useRef(new Animated.Value(1)).current;
  const personImageScale = useRef(new Animated.Value(1)).current;
  const explosionOpacity = useRef(new Animated.Value(0)).current;

  const handleShoot = () => {
    const newBullet = {id: bullets.length, position: new Animated.Value(250)};
    const targetPosition = 6000; // Adjust this value to position the bullet correctly

    // Update the bullets array immediately
    setBullets([...bullets, newBullet]);

    // Play the shooting sound
    shootSound.play(success => {
      if (success) {
        console.log('Sound played successfully');
      } else {
        console.log('Failed to play the sound');
      }
    });

    // Animate the bullet from the bottom (position 200) to the center of the top image (position 0)
    Animated.timing(newBullet.position, {
      toValue: -targetPosition,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      // Filter out the bullet from the array after the animation is complete
      setBullets(prevBullets =>
        prevBullets.filter(bullet => bullet.id !== newBullet.id),
      );

      // Trigger the shake animation when the bullet hits the person image
      handleBulletHit();
    });
  };

  const handleBulletHit = () => {
    // Start the parallel animation with rotate, blink, and explosion animations
    Animated.parallel([
      // Rotation animation
      Animated.sequence([
        Animated.timing(rotateAnimation, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnimation, {
          toValue: -1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnimation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),

      // Opacity animation for slight blink effect
      Animated.sequence([
        Animated.timing(personImageOpacity, {
          toValue: 0.7,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(personImageOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),

      // Scale animation for smashing effect
      Animated.sequence([
        Animated.timing(personImageScale, {
          toValue: 1.2, // Adjust the value to control the scale of the smash effect
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(personImageScale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),

      // Explosion animation using Animated.timing
      Animated.timing(explosionOpacity, {
        toValue: 1,
        duration: 300, // Adjust the duration to control the explosion effect
        useNativeDriver: true,
      }),
    ]).start(() => {
      // After the parallel animation is complete, reset the opacity and remove the bullet
      personImageOpacity.setValue(1);
      setBullets(prevBullets => prevBullets.filter(b => b.id !== newBullet.id));
      setShowExplosion(true); // Show the explosion animation
      setTimeout(() => {
        setShowExplosion(false); // Hide the explosion animation after a delay
      }, 1000); // Adjust the delay time to control how long the explosion is displayed
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagesContainer}>
        {/* Show the backside person image */}
        <ImageBackground source={{uri: image}} style={styles.personimage}>
          <Animated.Image
            source={{uri: image}}
            style={[
              {width: 150, height: 150},
              styles.personimage,
              {
                transform: [
                  {
                    rotate: rotateAnimation.interpolate({
                      inputRange: [-1, 1],
                      outputRange: ['-4deg', '4deg'],
                    }),
                  },
                  {scale: personImageScale},
                ],
                opacity: personImageOpacity,
              },
            ]}
          />
          {showExplosion && (
            // Show the explosion GIF on top of the person image when showExplosion is true
            <FastImage
              source={explosionGIF}
              style={{
                position: 'absolute',
                width: 150,
                height: 150,
              }}
            />
          )}
        </ImageBackground>

        <TouchableOpacity onPress={handleShoot}>
          <Image
            source={require('../../assets/images/cannon.jpeg')}
            style={[{width: 200, height: 200}, styles.cannonimage]}
          />
        </TouchableOpacity>
      </View>
      {bullets.map(bullet => (
        <Bullet
          key={bullet.id}
          position={bullet.position}
          onBulletHide={() => {
            setBullets(prevBullets =>
              prevBullets.filter(b => b.id !== bullet.id),
            );
          }}
          onBulletHit={handleBulletHit} // Pass the bullet hit callback to the Bullet component
        />
      ))}
    </View>
  );
};

export default AngerShooting;

const styles = StyleSheet.create({
  container: {
    fontFamily: 'ProximaNova-Regular',
    backgroundColor: '#fff',
  },
  imagesContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 20,
  },
  personimage: {
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  explosionImage: {
    position: 'absolute',
    zIndex: 0,
  },
  cannonimage: {
    alignSelf: 'center',
    marginTop: 275,
    transform: [{rotate: '30deg'}],
    resizeMode: 'contain',
  },
  bullet: {
    position: 'absolute',
  },
});
