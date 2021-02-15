import React, { useState, useEffect } from 'react';
import type { FC, FormEvent } from 'react';
import {
  Drawer,
  makeStyles,
  Theme,
  TextField,
  FormControl,
  Button,
  IconButton,
  InputLabel,
  Select,
  Paper
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import ReactQuill from 'react-quill';
import { useSelector } from '../../store';
import { State } from '../../reducers';
import type { Deal } from '../../types';

import 'react-quill/dist/quill.snow.css';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    top: 130
  },
  pane: {
    width: 400,
    padding: theme.spacing(2)
  },
  w100: {
    width: '100%'
  },
  control: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  hidden: {
    display: 'none'
  },
  detail_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingBottom: theme.spacing(2)
  },
  note: {
    flexDirection: 'column',
    paddingBottom: theme.spacing(2)
  },
  no_button: {
    width: 'calc(100% - 48px)'
  },
  temp: {
    width: 'calc(100% - 48px)',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

interface EditDealProps {
  curDeal?: Deal;
  isEdit: boolean;
  toggleDrawer: (open: boolean) => void;
}

const EditDeal: FC<EditDealProps> = ({ curDeal, isEdit, toggleDrawer }) => {
  const classes = useStyles();
  const [dealData, setDealData] = useState<any>(curDeal);
  const { companies, users } = useSelector((state: State) => ({
    companies: state.companies,
    users: state.users
  }));

  useEffect(() => {
    setDealData(curDeal);
    console.log(curDeal);
  }, [curDeal]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    console.log(dealData);
    if (e.target.name === 'dealPrice') {
      const regex = new RegExp('^[0-9]*$');

      if (regex.test(e.target.value)) {
        e.preventDefault();
      }
    }

    if (e.target.name === 'company' || e.target.name === 'user') {
      setDealData((prev: any) => ({
        ...prev,
        [e.target.name]: {
          id: e.target.value
        }
      }));
    } else {
      setDealData((prev: any) => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
    }
  };

  const handleChangeNote = (value: any) => {
    setDealData((prev: any) => ({
      ...prev,
      dealNote: value
    }));
  };

  const handleDeleteDeal = () => {
    console.log('delete clicked');
  };

  const handleCancel = () => {
    toggleDrawer(false);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
  };

  return (
    <Drawer
      anchor="right"
      open={isEdit}
      onClose={handleCancel}
      classes={{ paper: classes.paper }}
    >
      <div className={classes.pane}>
        <form onSubmit={handleSubmit}>
          <FormControl
            variant="outlined"
            size="small"
            required
            className={classes.detail_row}
          >
            <TextField
              name="name"
              className={classes.w100}
              label="Deal Name"
              value={dealData?.name || ''}
              onChange={handleChange}
              variant="outlined"
              size="small"
              required
            />
            <IconButton aria-label="delete" onClick={handleDeleteDeal}>
              <DeleteIcon />
            </IconButton>
          </FormControl>

          <FormControl
            variant="outlined"
            size="small"
            required
            className={classes.detail_row}
          >
            <div className={classes.w100}>
              <InputLabel htmlFor="outlined-company">Company</InputLabel>
              <Select
                label="Company"
                value={dealData?.company?.id}
                fullWidth
                onChange={handleChange}
                native
                inputProps={{
                  name: 'company',
                  id: 'outlined-company'
                }}
              >
                <option value="" className={classes.hidden} />
                {companies.data?.map((company) => {
                  return (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  );
                })}
              </Select>
            </div>
            <IconButton aria-label="openCompany">
              <LaunchIcon />
            </IconButton>
          </FormControl>

          <FormControl className={classes.detail_row}>
            <Paper className={classes.temp}>
              Here is the contacts table area
            </Paper>
            <IconButton aria-label="openCompany">
              <LaunchIcon />
            </IconButton>
          </FormControl>

          <FormControl className={classes.detail_row}>
            <TextField
              name="price"
              label="Deal Price"
              className={classes.no_button}
              value={dealData?.price || ''}
              type="number"
              onChange={handleChange}
              variant="outlined"
              size="small"
              required
            />
          </FormControl>

          <FormControl
            variant="outlined"
            size="small"
            className={classes.detail_row}
            required
          >
            <InputLabel htmlFor="outlined-user">Manager</InputLabel>
            <Select
              label="Manager"
              value={dealData?.user?.id}
              className={classes.no_button}
              onChange={handleChange}
              native
              inputProps={{
                name: 'user',
                id: 'outlined-user'
              }}
            >
              <option value="" className={classes.hidden} />
              {users.data?.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </Select>
          </FormControl>

          <FormControl className={classes.detail_row} required>
            <ReactQuill
              className={classes.w100}
              value={dealData?.dealNote || ''}
              onChange={handleChangeNote}
            />
            <Button variant="contained" fullWidth>
              Add note
            </Button>
          </FormControl>

          <FormControl className={classes.control}>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
            <Button variant="contained" onClick={handleCancel}>
              Cancel
            </Button>
          </FormControl>
        </form>
      </div>
    </Drawer>
  );
};

export default EditDeal;
