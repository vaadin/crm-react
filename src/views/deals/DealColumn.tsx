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
import type { Deal } from '../../types';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
    border: '1px solid black',
    background: '#eeffee',
    minHeight: 'calc(100vh - 240px)'
  }
}));

// Define types for deal column element properties
interface DealColumnProps {
  title: string;
  items: any;
  onClickItem: (deal: Deal) => void;
  toggleDrawer: (open: boolean) => void;
}

const DealColumn: FC<DealColumnProps> = (props: DealColumnProps) => {
  const classes = useStyles();
  const { title, items, onClickItem, toggleDrawer } = props;

  return (
    <Grid item xs={3}>
      <Grid item>
        <Typography component="span">{title}</Typography>
      </Grid>
      <Grid item>
        <Droppable droppableId={title}>
          {(provided) => (
            <RootRef rootRef={provided.innerRef}>
              <List className={classes.root}>
                {items.map((item: any, index: number) => (
                  <DealItem
                    key={item.id}
                    item={item}
                    index={index}
                    onClickItem={onClickItem}
                    toggleDrawer={toggleDrawer}
                  />
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
