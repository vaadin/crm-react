import React from 'react';
import type { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import DealColumn from './DealColumn';
import { useDispatch, useSelector } from '../../store';
import { State } from '../../reducers';
import { updateDeal } from '../../reducers/deals';

const DealStatus = ['New', 'ProposalSent', 'ClosedWon', 'ClosedLost'];

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const DragDrop: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.deals);

  const getItems = (key: string) => {
    return data.filter((deal) => deal.status === key);
  };

  // Handle drag & drop
  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    // Do nothing if item is dropped outside the list
    if (!destination) {
      return;
    }
    // Do nothing if the item is dropped into the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find column from which the item was dragged from
    const columnStart = getItems(source.droppableId);

    // Find column in which the item was dropped
    const columnFinish = getItems(destination.droppableId);

    // Moving items in the same list
    if (source.droppableId === destination.droppableId) {
      // const [movingItem] = columnStart.splice(source.index, 1);
      // columnFinish.splice(destination.index, 0, movingItem);
      return;
    }

    // Moting items to the other column
    const [movingItem] = columnStart.splice(source.index, 1);
    columnFinish.splice(destination.index, 0, movingItem);
    console.log(movingItem);
    dispatch(updateDeal(movingItem.id, {
      ...movingItem,
      status: destination.droppableId
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {DealStatus.map((status) => {
        return (
          <DealColumn key={status} title={status} items={getItems(status)} />
        );
      })}
    </DragDropContext>
  );
};

export default DragDrop;
