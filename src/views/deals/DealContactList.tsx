import React, { useState } from 'react';
import type { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Select,
  Checkbox,
  makeStyles,
  Theme
} from '@material-ui/core';
import { useSelector } from '../../store';
import { State } from '../../reducers';
import type { Contact } from '../../types';

interface DealContactsProps {
  contacts: Contact[];
}

const headCells = [
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'role', label: 'Role' }
];

const useStyles = makeStyles((theme: Theme) => ({
  headerColumn: {
    minWidth: 100
  },
  tableContainer: {
    border: '1px solid #808080',
    maxHeight: 200
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}));

type Order = 'asc' | 'desc';

const stableSort = (contacts: any, order: string, orderBy: string) => {
  const data = [...contacts];
  data.sort((a: any, b: any) => {
    if (order === 'desc') {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
    if (order === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    }
    return 0;
  });
  return data;
};

const DealContactList: FC<DealContactsProps> = ({ contacts }) => {
  const classes = useStyles();
  const [orderBy, setOrderBy] = useState<string>('firstName');
  const [order, setOrder] = useState<Order>('asc');
  const { dContacts } = useSelector((state: State) => state.deals);

  const handleTableRowClick = (contact: Contact) => () => {
    console.log(contact);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
  };

  const isExists = (id: number) => {
    if (dContacts.length > 0) {
      return dContacts.map((dc) => dc.contactId).includes(id);
    }
    return undefined;
  };

  const createSortHandler = (property: string) => () => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <TableContainer className={classes.tableContainer}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align="left"
                className={classes.headerColumn}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(contacts, order, orderBy).map((contact: Contact) => (
            <TableRow
              key={contact.id}
              hover
              onClick={handleTableRowClick(contact)}
            >
              <TableCell align="left">{contact.firstName}</TableCell>
              <TableCell align="left">{contact.lastName}</TableCell>
              <TableCell align="left">
                <Select value="" native fullWidth>
                  <option value="DecisionMaker">DecisionMaker</option>
                  <option value="Consulted">Consulted</option>
                  <option value="Informed">Informed</option>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DealContactList;
