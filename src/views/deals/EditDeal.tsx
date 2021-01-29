import React from 'react';
import type { FC } from 'react';
import { Drawer, makeStyles, Theme } from '@material-ui/core';
import type { Deal } from '../../types';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    top: 130
  },
  pane: {
    width: 400
  }
}));

interface EditDealProps {
  curDeal?: Deal;
  isEdit: boolean;
  toggleDrawer: (open: boolean) => void;
}

const EditDeal: FC<EditDealProps> = ({ curDeal, isEdit, toggleDrawer }) => {
  const classes = useStyles();

  return (
    <Drawer
      anchor="right"
      open={isEdit}
      onClose={() => toggleDrawer(false)}
      classes={{ paper: classes.paper }}
    >
      <div className={classes.pane}>
        {curDeal?.name}
      </div>
    </Drawer>
  );
};

export default EditDeal;
