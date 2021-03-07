import React from 'react';
import type { FC } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import DealColumn from './DealColumn';
import axios from '../../utils';
import { useDispatch, useSelector } from '../../store';
import { State } from '../../reducers';
import { updateDeal } from '../../reducers/deals';
import { Deal } from '../../types';

const DealStatus = ['New', 'ProposalSent', 'ClosedWon', 'ClosedLost'];

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

    //  Moving items to the other column
    const columnStart = getItems(source.droppableId);
    const movingItem = columnStart[source.index];

    dispatch(
      updateDeal(movingItem.id, isActive, {
        ...movingItem,
        status: destination.droppableId
      })
    );

    const note = {
      deal: { id: movingItem.id },
      text: `state changed from <b>${source.droppableId}</b> to <b>${destination.droppableId}</b>`
    };
    axios
      .post(`${process.env.REACT_APP_BASE_API}/note`, note)
      .then(() => {})
      .catch((e: any) => {
        console.log(e);
      });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {DealStatus.map((status) => {
        return (
          <DealColumn
            key={status}
            title={status}
            items={getItems(status)}
            onClickItem={setCurDeal}
            toggleDrawer={toggleDrawer}
          />
        );
      })}
    </DragDropContext>
  );
};

export default DragDrop;
