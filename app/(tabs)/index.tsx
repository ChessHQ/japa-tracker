import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  // useState and useEffect

  // state:
  // const [variable, function-that-sets-variable-when-u-want-to-update-it] = useState<type>(default-value)
  const [currentBead, setCurrentBead] = useState<number>(0) // react state hooks
  const [roundCompleted, setRoundCompleted] = useState<boolean>(false)

  const handleBeadClick = () => {
    setCurrentBead(currentBead + 1)
  }

  useEffect(() => {
    if (currentBead === 8) {
      setRoundCompleted(true)
    }
  }, [currentBead, /*other dependency vars*/])

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#0a8031ff', dark: '#0a8031ff' }}
      headerImage={
        <Image></Image>
      }
      >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Start chanting your rounds!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Japa Counter</ThemedText>
        <ThemedText type="default">Current Bead: {currentBead}</ThemedText>
        <button disabled = {roundCompleted} style={styles.button} onClick={handleBeadClick}>Chant</button>
      </ThemedView>
    </ParallaxScrollView>
  );
}

// 2 types of variables:
// const - can't be changed
// let - can be changed

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  button: {
    height: 50,
    width: 250,
    bottom: -300,
    left: 0,
  }
});
