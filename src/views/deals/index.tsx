import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import ActionBar from './ActionBar';
import DragDrop from './DragDrop';
import EditDeal from './EditDeal';
import { useDispatch } from '../../store';
import { getCompanies } from '../../reducers/companies';
import { getContacts } from '../../reducers/contacts';
import { getUsers } from '../../reducers/users';
import { getDeals } from '../../reducers/deals';
import type { Deal, FilterData } from '../../types';

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
    minDeal: '',
    maxDeal: '',
    state: false
  });
  const [isEdit, setEdit] = useState<boolean>(false);
  const [curDeal, setCurDeal] = useState<Deal>();

  useEffect(() => {
    dispatch(getCompanies());
    dispatch(getContacts());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDeals(filterData));
  }, [filterData]);

  const toggleDrawer = (open: boolean) => {
    setCurDeal(undefined);
    setEdit(open);
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    if (e.target.name === 'minDeal' || e.target.name === 'maxDeal') {
      const regex = new RegExp('^[0-9]*$');

      if (regex.test(e.target.value)) {
        e.preventDefault();
      }
    }
    setFilterData((prev: any) => ({
      ...prev,
      [e.target.name]:
        e.target.name === 'state' ? e.target.checked : e.target.value
    }));
  };

  const handleUpdate = () => {
    dispatch(getDeals(filterData));
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
        <ActionBar
          filterData={filterData}
          onChangeFilter={handleChange}
          toggleDrawer={toggleDrawer}
        />
      </Grid>
      <Grid container item justify="space-around" spacing={2}>
        <DragDrop isActive={filterData.state} setCurDeal={setCurDeal} toggleDrawer={toggleDrawer} />
        <EditDeal isEdit={isEdit} curDeal={curDeal} toggleDrawer={toggleDrawer} onUpdate={handleUpdate} />
      </Grid>
    </Grid>
  );
};

export default Deals;
