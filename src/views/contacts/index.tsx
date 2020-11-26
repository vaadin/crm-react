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
  Theme
} from '@material-ui/core';
import EditContact from './EditContact';
import { getContacts } from '../../reducers/contacts';
import { getCompanies } from '../../reducers/companies';
import { useDispatch, useSelector } from '../../store';
import { State } from '../../reducers';
import type { Contact } from '../../types/contact';

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
  }
}));

const Contacts: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
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
    setCurrent(contact);
  };

  const handleAddClick = () => {
    const emptyContact: Contact = {
      id: NaN,
      firstName: '',
      lastName: '',
      email: '',
      status: '',
      company: {
        id: NaN,
        name: '',
        persisted: false
      }
    };
    setCurrent(emptyContact);
  };

  const handleCancel = () => {
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
          />
          <Button className={classes.addButton} onClick={handleAddClick}>
            Add contact
          </Button>
        </Toolbar>
      </Grid>

      <Grid item className={classes.table} md={current ? 8 : 12}>
        <TableContainer className={classes.tableContainer}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="left" className={classes.headerColumn}>
                  First Name
                </TableCell>
                <TableCell align="left" className={classes.headerColumn}>
                  Last Name
                </TableCell>
                <TableCell align="left" className={classes.headerColumn}>
                  Email
                </TableCell>
                <TableCell align="left" className={classes.headerColumn}>
                  Status
                </TableCell>
                <TableCell align="left" className={classes.headerColumn}>
                  Company
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.data.map((contact: Contact) => (
                <TableRow
                  key={contact.id}
                  hover
                  onClick={handleTableRowClick(contact)}
                >
                  <TableCell align="left">{contact.firstName}</TableCell>
                  <TableCell align="left">{contact.lastName}</TableCell>
                  <TableCell align="left">{contact.email}</TableCell>
                  <TableCell align="left">{contact.status}</TableCell>
                  <TableCell align="left">{contact.company.name}</TableCell>
                </TableRow>
              ))}
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
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Contacts;
