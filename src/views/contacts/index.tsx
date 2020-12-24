import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import {
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  TextField,
  Button,
  makeStyles,
  Theme,
  TableSortLabel
} from '@material-ui/core';
import EditContact from './EditContact';
import { getContacts } from '../../reducers/contacts';
import { getCompanies } from '../../reducers/companies';
import { useDispatch, useSelector } from '../../store';
import { State } from '../../reducers';
import type { Contact } from '../../types/contact';

const headCells = [
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'email', label: 'Email' },
  { id: 'status', label: 'Status' },
  { id: 'company', label: 'Company' }
];

const useStyles = makeStyles((theme: Theme) => ({
  addButton: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(1),
    backgroundColor: '#efefef',
    color: '#1676f3'
  },
  headerColumn: {
    minWidth: 100
  },
  table: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  tableContainer: {
    border: '1px solid #808080',
    height: 'calc(100vh - 150px)'
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
      if (orderBy === 'company') {
        return a[orderBy].name > b[orderBy].name ? -1 : 1;
      }
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
    if (order === 'asc') {
      if (orderBy === 'company') {
        return a[orderBy].name < b[orderBy].name ? -1 : 1;
      }
      return a[orderBy] < b[orderBy] ? -1 : 1;
    }
    return 0;
  });
  return data;
};

let filter: string;

const Contacts: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [orderBy, setOrderBy] = React.useState<string>('firstName');
  const [order, setOrder] = React.useState<Order>('asc');
  const [current, setCurrent] = useState<Contact>();
  const { contacts, companies } = useSelector((state: State) => ({
    contacts: state.contacts,
    companies: state.companies
  }));

  useEffect(() => {
    dispatch(getContacts());
    dispatch(getCompanies());
  }, [dispatch]);

  const handleTableRowClick = (contact: Contact) => () => {
    if (current?.id === contact.id) {
      setCurrent(undefined);
    } else {
      setCurrent(contact);
    }
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    filter = e.target.value;
    dispatch(getContacts(filter));
  };

  const handleAddClick = () => {
    const emptyContact: Contact = {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      status: '',
      company: {
        id: 0,
        name: '',
        address: '',
        country: '',
        zipcode: '',
        state: '',
        deals: [],
        persisted: false
      }
    };
    setCurrent(emptyContact);
  };

  const createSortHandler = (property: string) => () => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleCancel = () => {
    setCurrent(undefined);
  };

  const handleUpdateTable = () => {
    dispatch(getContacts(filter));
    setCurrent(undefined);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Toolbar>
          <TextField
            name="name"
            label="Filter by name..."
            variant="outlined"
            size="small"
            type="search"
            onChange={handleFilter}
          />
          <Button className={classes.addButton} onClick={handleAddClick}>
            Add contact
          </Button>
        </Toolbar>
      </Grid>

      <Grid item className={classes.table} md={current ? 8 : 12}>
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
              {stableSort(contacts.data, order, orderBy).map(
                (contact: Contact) => (
                  <TableRow
                    key={contact.id}
                    hover
                    selected={contact.id === current?.id}
                    onClick={handleTableRowClick(contact)}
                  >
                    <TableCell align="left">{contact.firstName}</TableCell>
                    <TableCell align="left">{contact.lastName}</TableCell>
                    <TableCell align="left">{contact.email}</TableCell>
                    <TableCell align="left">{contact.status}</TableCell>
                    <TableCell style={{ whiteSpace: 'nowrap' }} align="left">
                      {contact.company.name}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item md={4}>
        {current && (
          <EditContact
            contact={current}
            companies={companies.data}
            handleCancel={handleCancel}
            updateTable={handleUpdateTable}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Contacts;
