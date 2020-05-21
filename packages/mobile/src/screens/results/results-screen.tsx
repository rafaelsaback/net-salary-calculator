import * as React from 'react';
import { Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ScreenName } from '../../types';
import { styles } from './results-screen.style';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ScreenName.Results
>;

interface ResultsScreenProps {
  navigation: ProfileScreenNavigationProp;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = (props) => {
  return (
    <View style={styles.container}>
      <Text>Net Salary</Text>
    </View>
  );
};
