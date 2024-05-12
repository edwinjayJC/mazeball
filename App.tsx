import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import MazeBall from './mazeBall';
import Animated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {
  Accelerometer,
  Barometer,
  DeviceMotion,
  Gyroscope,
  LightSensor,
  Magnetometer,
  MagnetometerUncalibrated,
  Pedometer,
} from 'expo-sensors';

Accelerometer.isAvailableAsync().then(result => {
  console.log('Is accelerometer available?', result);
});

export default function App() {

  const width = useSharedValue(100);

  const handlePress = () => {
    width.value = withSpring(width.value + 50);
  };


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
