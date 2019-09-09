import React, { FunctionComponent } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import withStyles from '@material-ui/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import { darkGray, BOX_SHADOW } from '../../helpers/consts';

const useStyles = makeStyles({
  questionMark: {
    color: 'white',
    backgroundColor: darkGray,
    borderRadius: '50%',
    paddingLeft: '2px',
    paddingRight: '4px',
    textAlign: 'center',
    fontSize: 'smaller',
  },
  clickable: {
    padding: '10px',
  },
});

interface HelptipProps {
  title: React.ReactNode;
}

const DarkTooltip = withStyles({
  tooltip: {
    backgroundColor: darkGray,
    color: 'white',
    fontSize: '12px',
    fontWeight: 'normal',
    padding: '10px 20px',
    ...BOX_SHADOW,
  },
})(Tooltip);

const Helptip: FunctionComponent<HelptipProps> = ({ title }) => {
  const classes = useStyles({});

  return (
    <DarkTooltip title={title} enterTouchDelay={100}>
      <span className={classes.clickable}>
        <span className={classes.questionMark}> ? </span>
      </span>
    </DarkTooltip>
  );
};

export default Helptip;
