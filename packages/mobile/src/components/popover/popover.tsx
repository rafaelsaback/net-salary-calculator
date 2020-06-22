import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PopoverView from 'react-native-popover-view';

interface PopoverProps {
  tooltipContent: React.ReactNode | string;
}

export const Popover: React.FC<PopoverProps> = ({
  tooltipContent,
  children,
}) => {
  return (
    <PopoverView
      arrowStyle={{ backgroundColor: 'transparent' }}
      from={(sourceRef, showPopover) => (
        <TouchableOpacity
          style={{ alignSelf: 'flex-start' }}
          onPress={showPopover}
        >
          <View style={{ marginLeft: 5 }} ref={sourceRef}>
            {children}
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
