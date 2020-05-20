import React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { appTheme } from '../theme';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AntDesign } from '@expo/vector-icons';

const styles = EStyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    height: '55rem',
    width: '80%',
    maxWidth: 250,
    borderRadius: appTheme.borderRadius,
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  currency: {
    flex: 1,
    textAlign: 'center',
    marginLeft: '5rem',
    color: appTheme.secondaryBlackColor,
    fontWeight: 'bold',
    fontSize: '20rem',
  },
  valueContainer: {
    flex: 4,
    alignItems: 'center',
  },
  value: {
    color: appTheme.primaryBlackColor,
    fontWeight: 'bold',
    fontSize: '30rem',
  },
  closeIcon: {
    padding: '5rem',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const SalaryInput: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.currency}>PLN</Text>
    <TouchableWithoutFeedback onPress={() => console.log('Changing salary...')}>
      <View style={styles.valueContainer}>
        <Text style={styles.value}>120 000</Text>
      </View>
    </TouchableWithoutFeedback>
    <TouchableWithoutFeedback onPress={() => console.log('Clearing salary...')}>
      <View style={styles.closeIcon}>
        <AntDesign
          size={EStyleSheet.value('24rem')}
          name="close"
          color={appTheme.secondaryBlackColor}
        />
      </View>
    </TouchableWithoutFeedback>
  </View>
);
