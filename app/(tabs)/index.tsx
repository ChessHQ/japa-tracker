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
        <button disabled = {roundCompleted} onClick={handleBeadClick}>Click</button>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
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
});
