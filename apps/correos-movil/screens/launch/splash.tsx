import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Animated as RNAnimated,
  Image,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type RootStackParamList = {
  Welcome: undefined;
  // Add other routes here if needed
};

export default function SplashScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const fadeAnim = useRef(new RNAnimated.Value(1)).current;
  const scale = useSharedValue(1);
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    if (bgLoaded) {
      scale.value = withTiming(1.1, { duration: 1000 });

      RNAnimated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        delay: 2500,
        useNativeDriver: true,
      }).start(() => {
        navigation.navigate('Welcome');
      });
    }
  }, [bgLoaded]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <RNAnimated.View style={[styles.container, { opacity: fadeAnim }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Fondo */}
      <View style={styles.absoluteFill}>
        <Image
          source={require('../../assets/fondo.png')}
          style={styles.backgroundImage}
          resizeMode="cover"
          blurRadius={3}
          onLoadEnd={() => setBgLoaded(true)} // <- Solo cuando termina de cargar
        />
        <View style={styles.whiteOverlay} />
      </View>

      {/* Logo con animación */}
      <Animated.Image
        source={require('../../assets/logo2.png')}
        style={[styles.logo, animatedStyle]}
        entering={FadeInDown.duration(800)}
        resizeMode="contain"
      />
    </RNAnimated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  whiteOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
  },
  logo: {
    width: 250,
    height: 250,
  },
});