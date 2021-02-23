import React, { useState, useEffect } from 'react';
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

const handleStopParentEvent = (e: React.ChangeEvent<any>) => {
  e.preventDefault();
  e.stopPropagation();
};

const DealContactList: FC<DealContactsProps> = ({ contacts }) => {
  const classes = useStyles();
  const { dContacts } = useSelector((state: State) => state.deals);
  const [orderBy, setOrderBy] = useState<string>('firstName');
  const [order, setOrder] = useState<Order>('asc');
  const [localData, setLocalData] = useState<any>([]);
  const numSelected = localData.filter((data: any) => data.isSelected === true)
    .length;
  const rowCount = contacts.length;

  useEffect(() => {
    const newData = contacts.map((contact) => {
      const found = dContacts.find((dc) => dc.contactId === contact.id);
      if (found) {
        return {
          id: contact.id,
          firstName: contact.firstName,
          lastName: contact.lastName,
          role: found.role,
          isSelected: true
        };
      }
      return {
        id: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        role: 'DecisionMaker',
        isSelected: false
      };
    });
    setLocalData(newData);
  }, [contacts, dContacts]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newData = localData.map((data: any) => ({
      ...data,
      isSelected: event.target.checked === true
    }));
    setLocalData(newData);
  };

  const handleTableRowClick = (id: number) => () => {
    const newData: any = [];
    localData.forEach((data: any) => {
      if (data.id === id) {
        newData.push({ ...data, isSelected: !data.isSelected });
      } else {
        newData.push(data);
      }
    });

    setLocalData(newData);
  };

  const handleChangeRole = (
    event: React.ChangeEvent<{ value: unknown }>,
    id: number
  ) => {
    // const index = selectedIndex(id);
    // const newData = localData;
    // newData[index].role = event.target.value;
    const newData: any = [];
    localData.forEach((data: any) => {
      if (data.id === id) {
        newData.push({ ...data, role: event.target.value });
      } else {
        newData.push(data);
      }
    });
    setLocalData(newData);
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
            <TableCell>
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={handleSelectAllClick}
                inputProps={{ 'aria-label': 'select all' }}
              />
            </TableCell>
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
          {stableSort(localData, order, orderBy).map((contact: any) => {
            const isItemSelected = contact.isSelected;
            const labelId = `enhanced-table-checkbox-${contact.id}`;

            return (
              <TableRow
                key={contact.id}
                hover
                onClick={handleTableRowClick(contact.id)}
                role="checkbox"
                tabIndex={-1}
                aria-checked={isItemSelected}
                selected={isItemSelected}
              >
                <TableCell>
                  <Checkbox
                    checked={isItemSelected}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </TableCell>
                <TableCell align="left">{contact.firstName}</TableCell>
                <TableCell align="left">{contact.lastName}</TableCell>
                <TableCell align="left" onClick={handleStopParentEvent}>
                  <Select
                    value={contact.role}
                    native
                    fullWidth
                    onChange={(e) => handleChangeRole(e, contact.id)}
                  >
                    <option value="DecisionMaker">DecisionMaker</option>
                    <option value="Consulted">Consulted</option>
                    <option value="Informed">Informed</option>
                  </Select>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DealContactList;
