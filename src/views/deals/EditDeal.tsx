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
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import ReactQuill from 'react-quill';
import DealContactList from './DealContactList';
import Note from './Note';
import axios from '../../utils';
import { useDispatch, useSelector } from '../../store';
import { State } from '../../reducers';
import { getNotes } from '../../reducers/notes';
import { getDealContacts } from '../../reducers/deals';
import type { Deal } from '../../types';

import 'react-quill/dist/quill.snow.css';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    top: 130,
    height: 'calc(100% - 130px)'
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingBottom: theme.spacing(2)
  },
  note: {
    flexDirection: 'column',
    width: '100%',
    paddingBottom: theme.spacing(2)
  },
  note_list: {
    marginBottom: theme.spacing(1),
    width: '100%',
    maxHeight: 300,
    overflow: 'auto'
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
  const dispatch = useDispatch();
  const [dealData, setDealData] = useState<any>(curDeal);
  const [contacts, setContacts] = useState<any>([]);
  const { companies, users, notes } = useSelector((state: State) => ({
    companies: state.companies,
    users: state.users,
    notes: state.notes
  }));

  const getContacts = (id: any) => {
    if (!id) return;
    axios
      .get<[]>(`${process.env.REACT_APP_BASE_API}/contacts?company=${id}`)
      .then(({ data }) => {
        setContacts(data);
      });
  };

  useEffect(() => {
    setDealData(curDeal);
    getContacts(curDeal?.company?.id);
    dispatch(getDealContacts(curDeal?.id));
    dispatch(getNotes(curDeal?.id));
  }, [curDeal]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    if (e.target.name === 'dealPrice') {
      const regex = new RegExp('^[0-9]*$');

      if (regex.test(e.target.value)) {
        e.preventDefault();
      }
    }

    if (e.target.name === 'company') {
      getContacts(e.target.value);
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

          <div className={classes.detail_row}>
            <DealContactList contacts={contacts} />
            <IconButton aria-label="openContacts">
              <LaunchIcon />
            </IconButton>
          </div>

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

          <FormControl className={classes.note} required>
            <ReactQuill
              className={classes.w100}
              value={dealData?.dealNote || ''}
              onChange={handleChangeNote}
            />
            <Button variant="contained" fullWidth>
              Add note
            </Button>
          </FormControl>

          <FormControl className={classes.note_list}>
            <Typography variant="h6">Notes</Typography>
            {notes.data?.map((note) => {
              return <Note item={note} key={note.id} />;
            })}
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
