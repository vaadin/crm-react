import React, { useState, useEffect } from 'react';
import type { FC, FormEvent } from 'react';
import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  Button,
  makeStyles,
  Theme
} from '@material-ui/core';
import type { Contact } from '../../types/contact';
import type { Company } from '../../types/companies';
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
  }
}));

interface EditContactProps {
  contact?: Contact;
  companies?: Company[];
  handleCancel: () => void;
  updateTable: () => void;
}

const EditContact: FC<EditContactProps> = ({
  contact,
  companies,
  handleCancel,
  updateTable
}) => {
  const classes = useStyles();
  const [contactData, setContactData] = useState<any>(contact);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setContactData({ ...contact, company: contact?.company.id });
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

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const data = {
      ...contactData,
      company: {
        id: contactData.company
      }
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
        });
    } else {
      await axios
        .post(`${process.env.REACT_APP_BASE_API}/contact`, data)
        .then(() => {
          setLoading(false);
          updateTable();
        });
    }
  };

  return (
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
      <FormControl variant="outlined" size="small" required>
        <InputLabel htmlFor="outlined-company">Company</InputLabel>
        <Select
          label="Company"
          value={contactData.company}
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
  );
};

export default EditContact;
