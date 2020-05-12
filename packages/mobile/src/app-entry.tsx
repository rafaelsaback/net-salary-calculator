import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { Container, Content, Tab, Tabs } from 'native-base';

const styles = StyleSheet.create({
  mainContainer: { paddingTop: 25 },
  tabStyle: { backgroundColor: '#fff' },
  tabTextStyle: { color: 'rgba(0, 0, 0, 0.54)' },
  activeTabTextStyle: { color: '#1976d2' },
  tabUnderlineStyle: { backgroundColor: '#1976d2' },
});

const AppEntry: React.FC = () => {
  return (
    <Container style={styles.mainContainer}>
      <Tabs
        scrollWithoutAnimation
        locked
        tabBarPosition={'bottom'}
        tabBarUnderlineStyle={styles.tabUnderlineStyle}
      >
        <Tab
          tabStyle={styles.tabStyle}
          activeTabStyle={styles.tabStyle}
          textStyle={styles.tabTextStyle}
          activeTextStyle={styles.activeTabTextStyle}
          heading="Umowa o Pracę"
        >
          <Content>
            <Text>Umowa o pracę</Text>
          </Content>
        </Tab>
        <Tab
          tabStyle={styles.tabStyle}
          activeTabStyle={styles.tabStyle}
          textStyle={styles.tabTextStyle}
          activeTextStyle={styles.activeTabTextStyle}
          heading="B2B Contract"
        >
          <Content>
            <Text>B2B Contract</Text>
          </Content>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AppEntry;
