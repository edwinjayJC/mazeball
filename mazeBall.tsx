import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Accelerometer } from "expo-sensors";

const MazeBall: React.FC = () => {
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const [ballWidth, setBallWidth] = useState(screenWidth * 0.3);
  const [screenWidthBarrier, setScreenWidthBarrier] = useState(screenWidth / 2 - (ballWidth / 2));
  const [screenHeightBarrier, setScreenHeightBarrier] = useState(screenHeight / 2 - (ballWidth / 2));

  useEffect(() => {
    setupAccelerometerListener();
    return cleanupAccelerometerListener;
  }, [ballWidth]);

  const setupAccelerometerListener = () => {
    Accelerometer.addListener(handleAcceleration);
  };

  const cleanupAccelerometerListener = () => {
    Accelerometer.removeAllListeners();
  };

  const handleButtonPress = () => {
    const newBallWidth = ballWidth === screenWidth * 0.1 ? screenWidth * 0.3 : screenWidth * 0.1;
    setBallWidth(newBallWidth);
    setScreenWidthBarrier(screenWidth / 2 - (newBallWidth / 2));
    setScreenHeightBarrier(screenHeight / 2 - (newBallWidth / 2));
  };

  const handleAcceleration = (data: { x: number; y: number; z: number }) => {
    const speedX = data.x * 30;
    const speedY = data.y * 30;
    const newPositionX = positionX.value - speedX;
    const newPositionY = positionY.value + speedY;
    const isWithinXBounds = newPositionX > -screenWidthBarrier && newPositionX < screenWidthBarrier;
    const isWithinYBounds = newPositionY > -screenHeightBarrier && newPositionY < screenHeightBarrier;

    positionX.value = withSpring(isWithinXBounds ? newPositionX : Math.max(-screenWidthBarrier, Math.min(screenWidthBarrier, newPositionX)), { damping: 2 });
    positionY.value = withSpring(isWithinYBounds ? newPositionY : Math.max(-screenHeightBarrier, Math.min(screenHeightBarrier, newPositionY)), { damping: 2 });
  };

  
  const ballStyle = StyleSheet.create({
    style: {
      backgroundColor: "blue",
      borderRadius: ballWidth / 2,
      position: "absolute",
      width: ballWidth,
      height: ballWidth,
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[ballStyle.style, animatedStyle]} />
      <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
        <Text style={styles.buttonText}>Resize Ball</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  button: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default MazeBall;
