import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import ActionBar from './ActionBar';
import DragDrop from './DragDrop';
import { useDispatch } from '../../store';
import { getCompanies } from '../../reducers/companies';
import { getContacts } from '../../reducers/contacts';
import { getUsers } from '../../reducers/users';
import { getDeals } from '../../reducers/deals';
import type { FilterData } from '../../types';

const useStyles = makeStyles((theme: Theme) => ({
  padding1: {
    padding: theme.spacing(1),
    textAlign: 'center'
  }
}));

const Deals: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState<FilterData>({
    company: [],
    contact: [],
    user: [],
    minDeal: undefined,
    maxDeal: undefined,
    state: false
  });

  useEffect(() => {
    dispatch(getCompanies());
    dispatch(getContacts());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDeals(filterData));
  }, [filterData]);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFilterData((prev: any) => ({
      ...prev,
      [e.target.name]:
        e.target.name === 'state' ? e.target.checked : e.target.value
    }));
  };

  return (
    <Grid container className={classes.padding1}>
      <Grid
        container
        item
        justify="space-between"
        alignItems="center"
        spacing={2}
      >
        <ActionBar filterData={filterData} onChangeFilter={handleChange} />
      </Grid>
      <Grid container item justify="space-around" spacing={2}>
        <DragDrop isActive={filterData.state} />
      </Grid>
    </Grid>
  );
};

export default Deals;
