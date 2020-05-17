import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './screens/home-screen/home-screen';
import { appTheme } from './theme';
import { ReactNavHeader } from './components/header';
import { Footer } from './components/footer';

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  whiteBackground: { flex: 1, backgroundColor: 'white' },
  redBackground: { flex: 4, backgroundColor: 'rgba(220, 20, 60, 0.1)' },
  contentContainer: { flex: 1, backgroundColor: 'transparent', paddingTop: 25 },
  footer: { backgroundColor: 'rgba(220, 20, 60, 0.1)' },
});

const { Navigator, Screen } = createStackNavigator();

const AppEntry: React.FC = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.backgroundContainer}>
        <View style={styles.whiteBackground} />
        <View style={styles.redBackground} />
      </View>
      <NavigationContainer theme={appTheme}>
        <Navigator initialRouteName="Home">
          <Screen
            name="Home"
            component={HomeScreen}
            options={{ title: '', header: ReactNavHeader }}
          />
        </Navigator>
      </NavigationContainer>
      <Footer />
    </View>
  );
};

export default AppEntry;
