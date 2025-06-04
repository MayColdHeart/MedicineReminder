import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const AlarmEffect = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    const playAlarm = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('@/assets/sounds/alarm.mp3'), 
        { shouldPlay: true, isLooping: true }
      );
      setSound(sound);
      await sound.playAsync();
    };

    playAlarm();

    Animated.loop(
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
    ).start();

    return () => {
      sound?.stopAsync();
      sound?.unloadAsync();
    };
  }, []);

  return (
    <View>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Ionicons name="alert-circle" size={100} color="#d32f2f" />
      </Animated.View>
      <Text>Tomar o medicamento!</Text>
    </View>
  );
};


export default AlarmEffect;