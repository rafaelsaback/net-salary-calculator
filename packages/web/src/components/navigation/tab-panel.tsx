import React, { FunctionComponent } from 'react';

interface TabPanelProps {
  value: number;
  index: number;
}

const TabPanel: FunctionComponent<TabPanelProps> = ({
  value,
  index,
  children,
}) => value === index && <> {children} </>;

export default TabPanel;
