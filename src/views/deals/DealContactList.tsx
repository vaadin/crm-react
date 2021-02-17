import React from 'react';
import type { FC } from 'react';
import { useSelector } from '../../store';
import { State } from '../../reducers';
import type { Contact } from '../../types';

interface DealContactsProps {
  contacts: Contact[];
}

const DealContactList: FC<DealContactsProps> = ({ contacts }) => {
  const { dContacts } = useSelector((state: State) => state.deals);

  return (
    <>
      {dContacts.length > 0 &&
        dContacts.map((dc) => (
          <div key={dc.contactId}>
            <p>{dc.contactId + dc.role}</p>
          </div>
        ))}
    </>
  );
};

export default DealContactList;
