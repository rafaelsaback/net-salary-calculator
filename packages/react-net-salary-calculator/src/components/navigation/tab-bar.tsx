import React, { FunctionComponent, ChangeEvent } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

interface AppTabsProps {
  value: any;
  setCurrentTab(value: any): void;
}

const TabBar: FunctionComponent<AppTabsProps> = ({ value, setCurrentTab }) => {
  const handleTabChange = (event: ChangeEvent, value: any) =>
    setCurrentTab(value);
  return (
    <Tabs
      value={value}
      onChange={handleTabChange}
      indicatorColor="primary"
      textColor="primary"
      variant="fullWidth"
    >
      <Tab disableRipple label="Umowa o pracę" />
      <Tab disableRipple label="B2B contract" />
    </Tabs>
  );
};

export default TabBar;
