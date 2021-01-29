import React from 'react';
import type { FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { makeStyles, Theme, ListItem, Typography } from '@material-ui/core';
import type { Deal } from '../../types';

const useStyles = makeStyles((theme: Theme) => ({
  dealItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    border: '1px solid black',
    background: 'white',
    height: 100,
    marginBottom: theme.spacing(1),
    boxShadow: '4px 4px 4px 0px rgba(173,173,173,1)'
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
  onClickItem: (deal: Deal) => void;
  toggleDrawer: (open: boolean) => void;
}

const DealItem: FC<DealItemProps> = (props: DealItemProps) => {
  const classes = useStyles();
  const { item, index, onClickItem, toggleDrawer } = props;

  const handleClickItem = () => {
    toggleDrawer(true);
    onClickItem(item);
  };

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
          onClick={handleClickItem}
        >
          <Typography className={classes.textWrap}>{item.name}</Typography>
          <Typography className={classes.textWrap}>
            {item.company?.name || 'Unknown'}
          </Typography>
          <Typography className={classes.textWrap}>
            {item.user?.name}
          </Typography>
        </ListItem>
      )}
    </Draggable>
  );
};

export default DealItem;
