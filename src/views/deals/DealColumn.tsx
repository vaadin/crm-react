import React from 'react';
import type { FC } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import {
  makeStyles,
  Theme,
  Grid,
  Typography,
  RootRef,
  List
} from '@material-ui/core';
import DealItem from './DealItem';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
    border: '1px solid black'
  }
}));

// Define types for deal column element properties
interface DealColumnProps {
  title: string;
  items: any;
}

const DealColumn: FC<DealColumnProps> = (props: DealColumnProps) => {
  const classes = useStyles();
  const { title, items } = props;

  return (
    <Grid item xs={3}>
      <Grid item>
        <Typography component="span">{title}</Typography>
      </Grid>
      <Grid item>
        <Droppable droppableId={title}>
          {(provided, snapshot) => (
            <RootRef rootRef={provided.innerRef}>
              <List className={classes.root}>
                {items.map((item: any, index: number) => (
                  <DealItem key={item.id} item={item} index={index} />
                ))}
                {provided.placeholder}
              </List>
            </RootRef>
          )}
        </Droppable>
      </Grid>
    </Grid>
  );
};

export default DealColumn;
