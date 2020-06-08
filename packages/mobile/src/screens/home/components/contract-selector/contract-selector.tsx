import React, { Dispatch, ReactNode } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { contractSelectorStyles } from './contract-selector.style';
import { isB2b, isEmployment } from '@nsc/shared/src/type-helpers';
import { ContractType } from '@nsc/shared/src/types';

interface ContractSelector {
  contractType: ContractType;
  textFirstLine: string;
  active: boolean;
  textSecondLine?: string | ReactNode;
  setContract: Dispatch<ContractType>;
}

export const ContractSelector: React.FC<ContractSelector> = ({
  contractType,
  textFirstLine,
  textSecondLine,
  active,
  setContract,
}) => {
  const imgContainerStyle = StyleSheet.flatten([
    contractSelectorStyles.imageContainer,
    active
      ? contractSelectorStyles.activeImageContainer
      : contractSelectorStyles.inactiveImageContainer,
  ]);

  const textStyle = StyleSheet.flatten([
    contractSelectorStyles.text,
    active
      ? contractSelectorStyles.activeText
      : contractSelectorStyles.inactiveText,
  ]);

  const buildImgPath = active
    ? require('@assets/building.png')
    : require('@assets/building-grayscale.png');
  const arrowImgPath = active
    ? require('@assets/arrow-left-right.png')
    : require('@assets/arrow-left-right-grayscale.png');
  const employeeImgPath = active
    ? require('@assets/employee.png')
    : require('@assets/employee-grayscale.png');

  return (
    <TouchableOpacity
      style={contractSelectorStyles.container}
      onPress={() => setContract(contractType)}
    >
      <View style={imgContainerStyle}>
        <Image
          style={contractSelectorStyles.buildingImg}
          source={buildImgPath}
        />
        <Image style={contractSelectorStyles.arrowImg} source={arrowImgPath} />
        {isB2b(contractType) && (
          <Image
            style={contractSelectorStyles.buildingImg}
            source={buildImgPath}
          />
        )}
        {isEmployment(contractType) && (
          <Image
            style={contractSelectorStyles.employeeImg}
            source={employeeImgPath}
          />
        )}
      </View>
      <View style={contractSelectorStyles.textContainer}>
        <Text style={textStyle}>{textFirstLine}</Text>
        {textSecondLine && <Text style={textStyle}>{textSecondLine}</Text>}
      </View>
    </TouchableOpacity>
  );
};
