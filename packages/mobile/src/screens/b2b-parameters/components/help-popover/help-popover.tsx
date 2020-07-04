import * as React from 'react';
import { AntDesign } from '@expo/vector-icons';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Popover } from '../../../../components/popover/popover';

interface PopoverProps {
  tooltipContent: React.ReactNode | string;
}

export const HelpPopover: React.FC<PopoverProps> = ({ tooltipContent }) => {
  return (
    <Popover tooltipContent={tooltipContent}>
      <AntDesign
        name="questioncircleo"
        size={EStyleSheet.value('18rem')}
        color="black"
        style={{ marginLeft: 2 }}
      />
    </Popover>
  );
};
