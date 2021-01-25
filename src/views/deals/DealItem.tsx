import React from 'react';
import type { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { makeStyles, Theme, ListItem, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  dealItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    border: '1px solid black',
    height: 100,
    marginBottom: theme.spacing(1)
  },
  textWrap: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: '90%'
  }
}));

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: 'rgb(235,235,235)'
  })
});

// Define types for deal item element properties
interface DealItemProps {
  item: any;
  index: number;
}

const DealItem: FC<DealItemProps> = (props: DealItemProps) => {
  const classes = useStyles();
  const { item, index } = props;

  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
          className={classes.dealItem}
        >
          <Typography className={classes.textWrap}>{item.name}</Typography>
          <Typography className={classes.textWrap}>
            {item.company?.name}
          </Typography>
          <Typography className={classes.textWrap}>
            {item.user?.name}
          </Typography>
          {/* <ListItemText primary={item.name} secondary={item.company?.name} /> */}
        </ListItem>
      )}
    </Draggable>
  );
};

export default DealItem;
