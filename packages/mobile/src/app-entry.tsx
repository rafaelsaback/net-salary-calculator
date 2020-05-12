import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { Container, Content, Tab, Tabs } from 'native-base';

const styles = StyleSheet.create({
  mainContainer: { paddingTop: 25 },
});

const AppEntry: React.FC = () => {
  return (
    <Container style={styles.mainContainer}>
      <Tabs scrollWithoutAnimation tabBarPosition={'bottom'}>
        <Tab heading="Umowa o Pracę">
          <Content>
            <Text>Umowa o pracę</Text>
          </Content>
        </Tab>
        <Tab heading="B2B Contract">
          <Content>
            <Text>B2B AAAA Contract</Text>
          </Content>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default AppEntry;
