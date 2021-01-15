import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import ActionBar from './ActionBar';
import DragDrop from './DragDrop';
import { useDispatch } from '../../store';
import { getCompanies } from '../../reducers/companies';
import { getContacts } from '../../reducers/contacts';
import { getUsers } from '../../reducers/users';

const useStyles = makeStyles((theme: Theme) => ({}));

const Deals: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState<any>({
    company: [],
    contact: [],
    user: [],
    minDeal: '',
    maxDeal: '',
    state: false
  });

  useEffect(() => {
    dispatch(getCompanies());
    dispatch(getContacts());
    dispatch(getUsers());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFilterData({
      ...filterData,
      [e.target.name]:
        e.target.name === 'state' ? e.target.checked : e.target.value
    });
  };

  return (
    <Grid container>
      <Grid container justify="space-between" alignItems="center">
        <ActionBar filterData={filterData} onChangeFilter={handleChange} />
      </Grid>
      <Grid container item>
        <DragDrop />
      </Grid>
    </Grid>
  );
};

export default Deals;
