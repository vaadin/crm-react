import React, { useState, useEffect } from 'react';
import type { FC, FormEvent } from 'react';
import {
  TextField,
  FormControl,
  Button,
  makeStyles,
  Theme
} from '@material-ui/core';
import type { Company } from '../../types/companies';

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

interface EditCompanyProps {
  company?: Company;
  handleCancel: () => void;
  updateTable: () => void;
}

const EditCompany: FC<EditCompanyProps> = ({
  company,
  handleCancel,
  updateTable
}) => {
  const classes = useStyles();
  const [companyData, setCompanyData] = useState<any>(company);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setCompanyData({ ...company });
  }, [company]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setCompanyData({
      ...companyData,
      [e.target.name]: e.target.value
    });
  };

  const handleDelete = () => {};

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    setLoading(true);
    setLoading(false);
    updateTable();
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="Name"
        value={companyData.name}
        onChange={handleChange}
        variant="outlined"
        size="small"
        required
      />
      <TextField
        name="country"
        label="Country"
        value={companyData.country}
        onChange={handleChange}
        variant="outlined"
        size="small"
        required
      />
      <TextField
        name="address"
        label="Address"
        value={companyData.address}
        onChange={handleChange}
        variant="outlined"
        size="small"
        required
      />
      <TextField
        name="zipcode"
        label="Zipcode"
        value={companyData.zipcode}
        onChange={handleChange}
        variant="outlined"
        size="small"
        required
      />
      <TextField
        name="state"
        label="State"
        value={companyData.state}
        onChange={handleChange}
        variant="outlined"
        size="small"
      />
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
          disabled={!companyData.id}
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

export default EditCompany;
