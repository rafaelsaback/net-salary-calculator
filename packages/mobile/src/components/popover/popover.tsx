import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import PopoverView from 'react-native-popover-view';
import { AntDesign } from '@expo/vector-icons';

interface PopoverProps {
  tooltipContent: React.ReactNode | string;
}

export const Popover: React.FC<PopoverProps> = ({ tooltipContent }) => {
  return (
    <PopoverView
      from={(sourceRef, showPopover) => (
        <TouchableOpacity
          style={{ alignSelf: 'flex-start' }}
          onPress={showPopover}
        >
          <View style={{ marginLeft: 5 }} ref={sourceRef}>
            <AntDesign name="questioncircleo" size={16} color="black" />
          </View>
        </TouchableOpacity>
      )}
    >
      <View style={{ margin: 10 }}>
        {typeof tooltipContent === 'string' ? (
          <Text>tooltipContent</Text>
        ) : (
          tooltipContent
        )}
      </View>
    </PopoverView>
  );
};
