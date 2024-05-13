import { StyleSheet, View } from 'react-native';
import MazeBall from './mazeBall';

import {
  Accelerometer,
} from 'expo-sensors';

Accelerometer.isAvailableAsync().then(result => {
  console.log('Is accelerometer available?', result);
});

export default function App() {
  return (
    <View style={styles.container}>
    <MazeBall/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
