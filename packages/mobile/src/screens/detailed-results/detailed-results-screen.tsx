import * as React from 'react';
import { useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { Container } from '../../components/containers/container';
import { BottomContainer } from '../../components/containers/bottom-container';
import { Selector } from '../../components/selector/selector';
import { createFontSizeStyle } from '../../helpers';
import { Table } from './components/table';
import { styles } from './detailed-results-screen.style';
import { appTheme } from '../../theme';

const WebSwiper: React.FC<any> = ({ children }) => children[0];

const Swiper = Platform.select({
  ios: () => require('react-native-swiper'),
  android: () => require('react-native-swiper'),
  web: () => WebSwiper,
})?.();

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
        <Swiper
          loop={false}
          activeDotColor={appTheme.primaryRedColor}
          paginationStyle={{ bottom: 0 }}
        >
          <View>
            <Text style={styles.title}>January</Text>
            <Table
              salary={{ label: 'Gross Salary', value: '10 000' }}
              endSalary={{ label: 'Net Salary', value: '7 143' }}
              salaryDiscounts={[
                { label: 'Pension', value: '976' },
                { label: 'Disability', value: '150' },
                { label: 'Sickness', value: '245' },
                { label: 'Health', value: '777' },
                { label: 'Tax', value: '709' },
              ]}
            />
          </View>
          <View>
            <Text style={styles.title}>January</Text>
            <Table
              salary={{ label: 'Gross Salary', value: '10 000' }}
              endSalary={{ label: 'Net Salary', value: '7 143' }}
              salaryDiscounts={[
                { label: 'Pension', value: '976' },
                { label: 'Disability', value: '150' },
                { label: 'Sickness', value: '245' },
                { label: 'Health', value: '777' },
                { label: 'Tax', value: '709' },
              ]}
            />
          </View>
        </Swiper>
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
