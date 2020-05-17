import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export const B2BSelector: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>B2B</Text>
    </View>
  );
};
