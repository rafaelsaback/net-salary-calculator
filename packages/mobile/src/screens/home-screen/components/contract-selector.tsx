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

  const buildImgPath = active ? 'building.png' : 'building-grayscale.png';
  const arrowImgPath = active
    ? 'arrow-left-right.png'
    : 'arrow-left-right-grayscale.png';
  const employeeImgPath = active ? 'employee.png' : 'employee-grayscale.png';

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
            source={require(`../../../../assets/${buildImgPath}`)}
          />
          <Image
            style={contractSelectorStyles.arrowImg}
            source={require(`../../../../assets/${arrowImgPath}`)}
          />
          {contractType === ContractType.B2B && (
            <Image
              style={contractSelectorStyles.buildingImg}
              source={require(`../../../../assets/${buildImgPath}`)}
            />
          )}
          {contractType === ContractType.Employment && (
            <Image
              style={contractSelectorStyles.buildingImg}
              source={require(`../../../../assets/${employeeImgPath}`)}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
