import React, { useState, useEffect } from 'react';
import type { FC, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
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
import { Alert, AlertTitle } from '@material-ui/lab';
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
    height: 'calc(100% - 130px)',
    overflowY: 'scroll'
  },
  pane: {
    width: 600,
    padding: theme.spacing(2),
    boxSizing: 'border-box'
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
  }
}));

interface EditDealProps {
  curDeal?: Deal;
  isEdit: boolean;
  toggleDrawer: (open: boolean) => void;
  onUpdate: () => void;
}

const EditDeal: FC<EditDealProps> = ({
  curDeal,
  isEdit,
  toggleDrawer,
  onUpdate
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [dealData, setDealData] = useState<any>(curDeal);
  const [contacts, setContacts] = useState<any>([]);
  const [dcData, setDcData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const { companies, users, notes } = useSelector((state: State) => ({
    companies: state.companies,
    users: state.users,
    notes: state.notes
  }));

  const getContacts = (id: any) => {
    if (!id) {
      setContacts([]);
    }
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

  const handleLaunchTable = (table: string) => {
    history.push(table);
  };

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

  const handleAddNote = async () => {
    if (dealData?.dealNote == null) {
      return;
    }

    const note = {
      deal: {id: curDeal?.id },
      text: dealData?.dealNote
    };
    setLoading(true);
    await axios
      .post(`${process.env.REACT_APP_BASE_API}/note`, note)
      .then(() => {
        setLoading(false);
        dispatch(getNotes(curDeal?.id));
        setDealData((prev: any) => ({
          ...prev,
          dealNote: null
        }));
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  const handleCancel = () => {
    toggleDrawer(false);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const data = {
      ...dealData,
      dealContacts: dcData.filter((item: any) => item.isSelected === true)
    };
    setLoading(true);
    if (dealData.id > 0) {
      await axios
        .put(`${process.env.REACT_APP_BASE_API}/deal/${dealData.id}`, data)
        .then(() => {
          setLoading(false);
          handleCancel();
          setHasError(false);
          onUpdate();
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          setHasError(true);
        });
    } else {
      await axios
        .post(`${process.env.REACT_APP_BASE_API}/deal`, data)
        .then(() => {
          setLoading(false);
          handleCancel();
          setHasError(false);
          onUpdate();
        })
        .catch((err) => {
          setLoading(false);
          setHasError(true);
          console.log(err);
        });
    }
  };

  const handleDeleteDeal = async () => {
    setLoading(true);
    await axios
      .delete(`${process.env.REACT_APP_BASE_API}/deal/${dealData.id}`)
      .then(() => {
        setLoading(false);
        handleCancel();
        onUpdate();
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
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
          {hasError && (
            <Alert severity="error" className="form-alert">
              <AlertTitle>Something went wrong!</AlertTitle>
              <p>Check that you have entered all the information correctly.</p>
            </Alert>
          )}
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
            <IconButton
              aria-label="delete"
              onClick={handleDeleteDeal}
              disabled={!dealData}
            >
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
            <IconButton
              aria-label="openCompany"
              onClick={() => handleLaunchTable('companies')}
            >
              <LaunchIcon />
            </IconButton>
          </FormControl>

          <div className={classes.detail_row}>
            <DealContactList
              contacts={contacts}
              localData={dcData}
              setLocalData={setDcData}
            />
            <IconButton
              aria-label="openContacts"
              onClick={() => handleLaunchTable('contacts')}
            >
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
            <Button
              variant="contained"
              fullWidth
              onClick={handleAddNote}
              disabled={loading}
            >
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
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              Save
            </Button>
            <Button
              variant="contained"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          </FormControl>
        </form>
      </div>
    </Drawer>
  );
};

export default EditDeal;
