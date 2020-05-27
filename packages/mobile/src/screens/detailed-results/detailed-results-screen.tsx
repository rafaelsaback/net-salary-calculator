import * as React from 'react';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { Container } from '../../components/containers/container';
import { BottomContainer } from '../../components/containers/bottom-container';
import { Selector } from '../../components/selector/selector';
import { createFontSizeStyle } from '../../helpers';
import { styles } from '../results/results-screen.style';

interface DetailedResultsScreenProps {}

enum DisplayMode {
  Monthly = 'Monthly',
  MonthlyAverage = '12-Month Average',
  Annually = 'Annually',
}
const displayModeOptions = [
  DisplayMode.Monthly,
  DisplayMode.MonthlyAverage,
  DisplayMode.Annually,
];

export const DetailedResultsScreen: React.FC<DetailedResultsScreenProps> = (
  props,
) => {
  const [displayMode, setDisplayMode] = useState<string>(DisplayMode.Monthly);
  return (
    <View style={styles.container}>
      <Container>
        <Text>January</Text>
      </Container>
      <BottomContainer>
        <Selector
          value={displayMode}
          options={displayModeOptions}
          onChange={setDisplayMode}
          width="90%"
          fontSize={createFontSizeStyle([16, 14, 16])}
        />
      </BottomContainer>
    </View>
  );
};
