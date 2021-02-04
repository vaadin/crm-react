import React, { useState, useEffect } from 'react';
import type { FC, FormEvent } from 'react';
import {
  Drawer,
  makeStyles,
  Theme,
  Grid,
  TextField,
  FormControl,
  Button,
  IconButton,
  InputLabel,
  Select
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import LaunchIcon from '@material-ui/icons/Launch';
import { useSelector } from '../../store';
import { State } from '../../reducers';
import type { Deal } from '../../types';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    top: 130
  },
  pane: {
    width: 400,
    padding: theme.spacing(2)
  },
  flex1: {
    flexGrow: 1
  },
  control: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  hidden: {
    display: 'none'
  },
  company_selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
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
  const { data } = useSelector((state: State) => state.companies);

  useEffect(() => {
    setDealData(curDeal);
  }, [curDeal]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setDealData({
      ...dealData,
      [e.target.name]: e.target.value
    });
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
          <Grid container justify="space-between">
            <TextField
              name="dealName"
              className={classes.flex1}
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
          </Grid>

          <FormControl
            variant="outlined"
            size="small"
            required
            className={classes.company_selector}
          >
            <div className={classes.flex1}>
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
                {data?.map((company) => {
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
