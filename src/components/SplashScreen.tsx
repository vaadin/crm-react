import React from 'react';
import type { FC } from 'react';
import { Box, LinearProgress, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    padding: theme.spacing(3),
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 2000
  }
}));

const SlashScreen: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box width={400}>
        <LinearProgress />
      </Box>
    </div>
  );
};

export default SlashScreen;
