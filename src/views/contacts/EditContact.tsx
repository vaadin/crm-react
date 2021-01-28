import React, { useState, useEffect } from 'react';
import type { FC, FormEvent } from 'react';
import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  Button,
  Modal,
  makeStyles,
  Theme
} from '@material-ui/core';
import EditCompany from '../companies/EditCompany';
import { useSelector } from '../../store';
import { State } from '../../reducers';
import type { Company, Contact } from '../../types';
import axios from '../../utils';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '16px',
    paddingRight: theme.spacing(2)
  },
  control: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  hidden: {
    display: 'none'
  },
  company_selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  company_select: {
    flex: 1
  },
  add_company: {
    marginLeft: theme.spacing(1)
  },
  modal: {
    position: 'absolute',
    top: '100px',
    left: 'calc(50% - 232px)',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    '&:focus': {
      outline: 'none'
    }
  }
}));

const emptyCompany: Company = {
  id: 0,
  name: '',
  address: '',
  country: '',
  zipcode: '',
  state: '',
  deals: []
};

interface EditContactProps {
  contact?: Contact;
  companies?: Company[];
  handleCancel: () => void;
  updateTable: () => void;
  onCompaniesUpdate: () => void;
  companyAdded: boolean;
  onChangeAdded: () => void;
}

const EditContact: FC<EditContactProps> = ({
  contact,
  companies,
  handleCancel,
  updateTable,
  onCompaniesUpdate,
  companyAdded,
  onChangeAdded
}) => {
  const classes = useStyles();
  const [contactData, setContactData] = useState<any>(contact);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { countries } = useSelector((state: State) => state.companies);

  useEffect(() => {
    setContactData({ ...contact, company: contact?.company.id });
    setError('');
  }, [contact]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value
    });
  };

  const handleDelete = async () => {
    setLoading(true);
    await axios
      .delete(`${process.env.REACT_APP_BASE_API}/contact/${contactData.id}`)
      .then(() => {
        setLoading(false);
        updateTable();
      });
  };

  const handleAddCompany = () => {
    setOpenModal(true);
  };

  const handleUpdateForm = () => {
    setOpenModal(false);
    onCompaniesUpdate();
    onChangeAdded();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const data = {
      ...contactData,
      company: companyAdded
        ? { id: companies && companies[companies.length - 1]?.id }
        : { id: contactData.company }
    };

    setLoading(true);
    if (contactData.id > 0) {
      await axios
        .put(
          `${process.env.REACT_APP_BASE_API}/contact/${contactData.id}`,
          data
        )
        .then(() => {
          setLoading(false);
          updateTable();
        })
        .catch((err) => {
          setLoading(false);
          if (err === 'failure') {
            setError('Email is already exists');
          }
        });
    } else {
      await axios
        .post(`${process.env.REACT_APP_BASE_API}/contact`, data)
        .then(() => {
          setLoading(false);
          updateTable();
        })
        .catch((err) => {
          setLoading(false);
          if (err === 'failure') {
            setError('Email is already exists');
          }
        });
    }
  };

  return (
    <>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          name="firstName"
          label="First Name"
          value={contactData.firstName}
          onChange={handleChange}
          variant="outlined"
          size="small"
          required
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={contactData.lastName}
          onChange={handleChange}
          variant="outlined"
          size="small"
          required
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          value={contactData.email}
          onChange={handleChange}
          variant="outlined"
          size="small"
          required
          error={error !== ''}
          helperText={error}
        />
        <FormControl variant="outlined" size="small" required>
          <InputLabel htmlFor="outlined-status">Status</InputLabel>
          <Select
            label="Status"
            value={contactData.status}
            onChange={handleChange}
            native
            inputProps={{
              name: 'status',
              id: 'outlined-status'
            }}
          >
            <option value="" className={classes.hidden} />
            <option value="ImportedLead">ImportedLead</option>
            <option value="NotContacted">NotContacted</option>
            <option value="Contacted">Contacted</option>
            <option value="Customer">Customer</option>
            <option value="ClosedLost">ClosedLost</option>
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          size="small"
          required
          className={classes.company_selector}
        >
          <div className={classes.company_select}>
            <InputLabel htmlFor="outlined-company">Company</InputLabel>
            <Select
              label="Company"
              value={
                companyAdded
                  ? companies && companies[companies.length - 1]?.id
                  : contactData.company
              }
              fullWidth
              onChange={handleChange}
              native
              inputProps={{
                name: 'company',
                id: 'outlined-company'
              }}
            >
              <option value="" className={classes.hidden} />
              {companies?.map((company) => {
                return (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                );
              })}
            </Select>
          </div>
          <Button
            variant="contained"
            onClick={handleAddCompany}
            className={classes.add_company}
          >
            +
          </Button>
        </FormControl>
        <FormControl className={classes.control}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDelete}
            disabled={!contactData.id}
          >
            Delete
          </Button>
          <Button variant="contained" onClick={handleCancel}>
            Cancel
          </Button>
        </FormControl>
      </form>
      <Modal open={openModal} onClose={handleCloseModal}>
        <div className={classes.modal}>
          <EditCompany
            company={emptyCompany}
            countries={countries}
            handleCancel={handleCloseModal}
            updateTable={handleUpdateForm}
          />
        </div>
      </Modal>
    </>
  );
};

export default EditContact;
