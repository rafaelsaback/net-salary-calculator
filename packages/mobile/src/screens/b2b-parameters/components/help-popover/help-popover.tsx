import * as React from 'react';
import { Popover } from '../../../../components/popover/popover';
import { AntDesign } from '@expo/vector-icons';

interface PopoverProps {
  tooltipContent: React.ReactNode | string;
}

export const HelpPopover: React.FC<PopoverProps> = ({ tooltipContent }) => {
  return (
    <Popover tooltipContent={tooltipContent}>
      <AntDesign name="questioncircleo" size={16} color="black" />
    </Popover>
  );
};
