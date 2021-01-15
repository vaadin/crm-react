import React from 'react';
import type { FC } from 'react';
import {
  Grid,
  Typography,
  Select,
  FormControl,
  FormControlLabel,
  InputLabel,
  TextField,
  makeStyles,
  Theme,
  Button,
  MenuItem,
  Checkbox,
  ListItemText
} from '@material-ui/core';
import { useSelector } from '../../store';
import { State } from '../../reducers';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const useStyles = makeStyles((theme: Theme) => ({
  filter: {
    flex: 1,
    margin: 0
  },
  formControl: {
    width: 170
  },
  minmax: {
    width: 100
  },
  addButton: {
    backgroundColor: '#efefef',
    color: '#1676f3',
    marginRight: theme.spacing(1)
  }
}));

interface ActionBarProps {
  filterData: any;
  onChangeFilter: (e: React.ChangeEvent<any>) => void;
}

const ActionBar: FC<ActionBarProps> = ({filterData, onChangeFilter}) => {
  const classes = useStyles();
  const { contacts, companies, users } = useSelector((state: State) => ({
    contacts: state.contacts,
    companies: state.companies,
    users: state.users
  }));

  return (
    <>
      <Grid
        container
        item
        alignItems="center"
        spacing={3}
        className={classes.filter}
      >
        <Grid item>
          <Typography component="span">Filter:</Typography>
        </Grid>

        <Grid item>
          <FormControl
            variant="outlined"
            size="small"
            className={classes.formControl}
          >
            <InputLabel htmlFor="outlined-company">Company</InputLabel>
            <Select
              label="Company"
              multiple
              value={filterData.company}
              renderValue={(selected) =>
                companies.data
                  .filter((company) => (selected as any).includes(company.id))
                  .map((fcomp) => fcomp.name)
                  .join(',')}
              onChange={onChangeFilter}
              MenuProps={MenuProps}
              inputProps={{
                name: 'company',
                id: 'outlined-company'
              }}
            >
              {companies.data.map((company) => (
                <MenuItem key={company.id} value={company.id}>
                  <Checkbox
                    checked={filterData.company.indexOf(company.id) > -1}
                  />
                  <ListItemText primary={company.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl
            variant="outlined"
            size="small"
            className={classes.formControl}
          >
            <InputLabel htmlFor="outlined-contact">Contact</InputLabel>
            <Select
              label="Contact"
              multiple
              value={filterData.contact}
              renderValue={(selected) =>
                contacts.data
                  .filter((contact) => (selected as any).includes(contact.id))
                  .map((fcont) => `${fcont.firstName} ${fcont.lastName}`)
                  .join(',')}
              onChange={onChangeFilter}
              MenuProps={MenuProps}
              inputProps={{
                name: 'contact',
                id: 'outlined-contact'
              }}
            >
              {contacts.data.map((contact) => (
                <MenuItem key={contact.id} value={contact.id}>
                  <Checkbox
                    checked={filterData.contact.indexOf(contact.id) > -1}
                  />
                  <ListItemText primary={`${contact.firstName} ${contact.lastName}`} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl
            variant="outlined"
            size="small"
            className={classes.formControl}
          >
            <InputLabel htmlFor="outlined-user">Account Manager</InputLabel>
            <Select
              label="Account Manager"
              multiple
              value={filterData.user}
              renderValue={(selected) =>
                users.data
                  .filter((user) => (selected as any).includes(user.id))
                  .map((fuser) => fuser.name)
                  .join(',')}
              onChange={onChangeFilter}
              MenuProps={MenuProps}
              inputProps={{
                name: 'user',
                id: 'outlined-user'
              }}
            >
              {users.data.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  <Checkbox
                    checked={filterData.user.indexOf(user.id) > -1}
                  />
                  <ListItemText primary={user.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <TextField
            name="minDeal"
            label="Min Value"
            className={classes.minmax}
            value={filterData.minDeal}
            onChange={onChangeFilter}
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item>
          <TextField
            name="maxDeal"
            label="Max Value"
            className={classes.minmax}
            value={filterData.maxDeal}
            onChange={onChangeFilter}
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item>
          <FormControlLabel
            control={<Checkbox name="state" color="primary" checked={filterData.state} onChange={onChangeFilter} />}
            label="Active only"
          />
        </Grid>
      </Grid>

      <Grid item>
        <Button className={classes.addButton}>Add Deal</Button>
      </Grid>
    </>
  );
};

export default ActionBar;