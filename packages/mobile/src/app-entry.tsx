import React from 'react';
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/home/home-screen';
import { appTheme, appThemeReactNavigation } from './theme';
import { Footer } from './components/footer';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ResultsScreen } from './screens/results/results-screen';
import { RootStackParamList, ScreenName } from './types';
import { DetailedResultsScreen } from './screens/detailed-results/detailed-results-screen';
import { B2bParametersScreen } from './screens/b2b-parameters/b2b-parameters-screen';
import { B2bTax, Sickness, ZUS } from '@nsc/shared/src/types';
import { MenuIcon } from './components/menu-icon/menu-icon';

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
});

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const AppEntry: React.FC = () => {
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer theme={appThemeReactNavigation}>
        <Navigator
          initialRouteName={ScreenName.Home}
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: appTheme.primaryRedColor,
              height: EStyleSheet.value('55rem'),
            },
            headerBackTitle: '',
            headerTintColor: 'white',
            headerRight: MenuIcon,
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: EStyleSheet.value('22rem'),
            },
          }}
        >
          <Screen
            name={ScreenName.Home}
            component={HomeScreen}
            options={{ title: 'Gross Salary' }}
            initialParams={{
              b2bParameters: {
                taxType: B2bTax.Linear,
                zus: ZUS.No,
                sickness: Sickness.No,
              },
            }}
          />
          <Screen
            name={ScreenName.B2bParameters}
            component={B2bParametersScreen}
            options={{ title: 'B2B Parameters' }}
          />
          <Screen
            name={ScreenName.Results}
            component={ResultsScreen}
            options={{ title: 'Net Salary' }}
          />
          <Screen
            name={ScreenName.DetailedResults}
            component={DetailedResultsScreen}
            options={{ title: 'Detailed Results' }}
          />
        </Navigator>
      </NavigationContainer>
      <Footer />
    </View>
  );
};

export default AppEntry;
