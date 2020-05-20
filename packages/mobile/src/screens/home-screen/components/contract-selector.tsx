import React, { ReactNode } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { contractSelectorStyles } from './contract-selector.style';

interface ContractSelector {
  contractType: ContractType;
  textFirstLine: string;
  textSecondLine?: string | ReactNode;
  active?: boolean;
}

export enum ContractType {
  Employment = 'Employment',
  B2B = 'B2B',
}

export const ContractSelector: React.FC<ContractSelector> = ({
  contractType,
  textFirstLine,
  textSecondLine,
  active,
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
    <TouchableOpacity>
      <View style={contractSelectorStyles.container}>
        <View style={contractSelectorStyles.textContainer}>
          <Text style={textStyle}>{textFirstLine}</Text>
          {textSecondLine && <Text style={textStyle}>{textSecondLine}</Text>}
        </View>
        <View style={imgContainerStyle}>
          <Image
            style={contractSelectorStyles.buildingImg}
            source={buildImgPath}
          />
          <Image
            style={contractSelectorStyles.arrowImg}
            source={arrowImgPath}
          />
          {contractType === ContractType.B2B && (
            <Image
              style={contractSelectorStyles.buildingImg}
              source={buildImgPath}
            />
          )}
          {contractType === ContractType.Employment && (
            <Image
              style={contractSelectorStyles.employeeImg}
              source={employeeImgPath}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
