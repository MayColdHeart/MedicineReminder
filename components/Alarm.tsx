import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const AlarmEffect = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const soundRef = useRef<Audio.Sound | null>(null); // useRef 

  useEffect(() => {
    let isMounted = true;

    const playAlarm = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('@/assets/sounds/alarm.mp3'),
        { shouldPlay: true, isLooping: true }
      );
      soundRef.current = sound;
      if (isMounted) await sound.playAsync();
    };

    playAlarm();

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
      ])
    );
    animation.start();

    return () => {
      isMounted = false;
      if (soundRef.current) {
        soundRef.current.stopAsync();
        soundRef.current.unloadAsync();
      }
      animation.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* <Animated.View style={[ { transform: [{ scale: scaleAnim }] }]}>
        <Ionicons name="alert-circle" size={100} color="#d32f2f" />
      </Animated.View> */}
      <Text style={styles.text}>Remedio</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },

  text: {
    fontSize: 18,
    color: '#d32f2f',
    fontWeight: 'bold',
  },
});

export default AlarmEffect;
