import React from 'react';
import type { FC } from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import type { Note } from '../../types';

const useStyles = makeStyles((theme: Theme) => ({
  note: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
    background: 'lightyellow',
    borderRadius: 20,
    border: '1px solid lightgreen'
  }
}));

interface NoteProps {
  item: Note;
}

const NoteItem: FC<NoteProps> = ({ item }) => {
  const classes = useStyles();

  return (
    <div className={classes.note}>
      <span>{item.text}</span>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <span>{item.user?.name}</span>
        </Grid>
        <Grid item>
          <span>{new Date(item.createdAt).toLocaleString()}</span>
        </Grid>
      </Grid>
    </div>
  );
};

export default NoteItem;
