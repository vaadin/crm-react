import React from 'react';
import type { FC } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DealColumn from './DealColumn';
import { useDispatch, useSelector } from '../../store';
import { State } from '../../reducers';
import { updateDeal } from '../../reducers/deals';
import { Deal } from '../../types';

const DealStatus = [
  { active: true, name: 'New' },
  { active: true, name: 'ProposalSent' },
  { active: false, name: 'ClosedWon' },
  { active: false, name: 'ClosedLost' }
];

interface DragDropProps {
  isActive: boolean;
  setCurDeal: (deal: Deal) => void;
  toggleDrawer: (open: boolean) => void;
}

const DragDrop: FC<DragDropProps> = ({
  isActive,
  setCurDeal,
  toggleDrawer
}) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.deals);

  const getItems = (key: string) => {
    return data.filter((deal) => deal.status === key);
  };

  // Handle drag & drop
  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // Do nothing if item is dropped outside the list
    if (!destination) {
      return;
    }

    // Find column from which the item was dragged from
    const columnStart = getItems(source.droppableId);
    // Find column in which the item was dropped
    const columnFinish = getItems(destination.droppableId);

    // Do nothing if the item is dropped into the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Moving items in the same list
    if (source.droppableId === destination.droppableId) {
      // do something if necessary but not now
      return;
    }

    // Moving items to the other column
    const [movingItem] = columnStart.splice(source.index, 1);
    columnFinish.splice(destination.index, 0, movingItem);

    dispatch(
      updateDeal(movingItem.id, {
        ...movingItem,
        status: destination.droppableId
      })
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {DealStatus.filter(
        (status) =>
          isActive === false || (isActive === true && status.active === true)
      ).map((status) => {
        return (
          <DealColumn
            key={status.name}
            title={status.name}
            items={getItems(status.name)}
            onClickItem={setCurDeal}
            toggleDrawer={toggleDrawer}
          />
        );
      })}
    </DragDropContext>
  );
};

export default DragDrop;
