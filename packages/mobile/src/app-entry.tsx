import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './screens/home/home-screen';
import { appThemeReactNavigation } from './theme';
import { Footer } from './components/footer';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ResultsScreen } from './screens/results/results-screen';
import { RootStackParamList, ScreenName } from './types';
import { MonthlyBreakdownScreen } from './screens/monthly-breakdown/monthly-breakdown-screen';
import { B2BParametersScreen } from './screens/b2b-parameters/b2b-parameters-screen';
import { B2BTax, Sickness, ZUS } from '@nsc/shared/src/types';

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
});

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();
const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

const AppEntry: React.FC = () => {
  return (
    <View style={styles.mainContainer}>
      <NavigationContainer theme={appThemeReactNavigation}>
        <Navigator
          initialRouteName={ScreenName.Home}
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: { height: EStyleSheet.value('70rem') },
          }}
        >
          <Screen
            name={ScreenName.Home}
            component={HomeScreen}
            options={{ title: '' }}
            initialParams={{
              b2bParameters: {
                taxType: B2BTax.Linear,
                zus: ZUS.No,
                sickness: Sickness.No,
                costs: '0',
              },
            }}
          />
          <Screen
            name={ScreenName.B2BParameters}
            component={B2BParametersScreen}
            options={{ title: '' }}
          />
          <Screen
            name={ScreenName.Results}
            component={ResultsScreen}
            options={{ title: '' }}
          />
          <Screen
            name={ScreenName.MonthlyBreakdown}
            component={MonthlyBreakdownScreen}
            options={{ title: '' }}
          />
        </Navigator>
      </NavigationContainer>
      <Footer />
    </View>
  );
};

export default AppEntry;
