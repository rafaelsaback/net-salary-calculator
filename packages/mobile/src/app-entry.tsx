import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { Body } from './components/body';
import { HomeScreen } from './screens/home-screen/home-screen';

const styles = StyleSheet.create({
  mainContainer: { display: 'flex', flex: 1 },
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

const AppEntry: React.FC = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.backgroundContainer}>
        <View style={styles.whiteBackground} />
        <View style={styles.redBackground} />
      </View>
      <View style={styles.contentContainer}>
        <Header />
        <Body>
          <HomeScreen />
        </Body>
        <Footer />
      </View>
    </View>
  );
};

export default AppEntry;
