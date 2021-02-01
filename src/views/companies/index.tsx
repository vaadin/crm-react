import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import {
  Toolbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  TextField,
  Button,
  makeStyles,
  Theme,
  TableSortLabel
} from '@material-ui/core';
import EditCompany from './EditCompany';
import { getCompanies, getCountries } from '../../reducers/companies';
import { useDispatch, useSelector } from '../../store';
import { State } from '../../reducers';
import type { Company } from '../../types';

const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'country', label: 'Country' },
  { id: 'nr', label: 'Active deals (nr)' },
  { id: 'sum', label: 'Active deals (sum)' }
];

const useStyles = makeStyles((theme: Theme) => ({
  addButton: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(1),
    backgroundColor: '#efefef',
    color: '#1676f3'
  },
  headerColumn: {
    minWidth: 100
  },
  table: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  tableContainer: {
    border: '1px solid #808080',
    height: 'calc(100vh - 150px)'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}));

type Order = 'asc' | 'desc';

const getDealPrice = (dealTotal: number) => {
  return dealTotal?.toFixed(2).toString() || '0.00';
};

const stableSort = (companies: any, order: string, orderBy: string) => {
  const data = [...companies];
  data.sort((a: any, b: any) => {
    if (order === 'desc') {
      if (orderBy === 'nr') {
        return a.dealCount > b.dealCount ? -1 : 1;
      }
      if (orderBy === 'sum') {
        return getDealPrice(a.dealTotal) > getDealPrice(b.dealTotal) ? -1 : 1;
      }
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
    if (order === 'asc') {
      if (orderBy === 'nr') {
        return a.dealCount < b.dealCount ? -1 : 1;
      }
      if (orderBy === 'sum') {
        return getDealPrice(a.dealTotal) < getDealPrice(b.dealTotal) ? -1 : 1;
      }
      return a[orderBy] < b[orderBy] ? -1 : 1;
    }
    return 0;
  });
  return data;
};

let filter: string;

const Companies: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [orderBy, setOrderBy] = React.useState<string>('name');
  const [order, setOrder] = React.useState<Order>('asc');
  const [current, setCurrent] = useState<Company>();
  const { data, countries } = useSelector((state: State) => state.companies);
  const [newCompanies, setNewCompanies] = useState<Company[]>(data);
  const [filterList, setFilterList] = useState<any>({
    name: '',
    country: '',
    nr: '',
    sum: ''
  });

  const getVisibleCompanies = () => {
    let temp = data;
    Object.keys(filterList).forEach((field) => {
      temp = temp.filter((company: any) => {
        if (field === 'nr') {
          return company.dealCount.toString().includes(filterList[field]);
        }
        if (field === 'sum') {
          return getDealPrice(company.dealTotal).includes(filterList[field]);
        }
        return company[field]
          ?.toLowerCase()
          .includes(filterList[field].toLowerCase());
      });
    });
    setNewCompanies(temp);
  };

  useEffect(() => {
    dispatch(getCompanies());
    if (countries.length === 0) {
      dispatch(getCountries());
    }
  }, [dispatch]);

  useEffect(() => {
    getVisibleCompanies();
  }, [data, filterList]);

  const handleTableRowClick = (company: Company) => () => {
    setCurrent(current?.id === company.id ? undefined : company);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    filter = e.target.value;
    dispatch(getCompanies(filter));
  };

  const handleAddClick = () => {
    const emptyCompany: Company = {
      id: 0,
      name: '',
      address: '',
      country: '',
      zipcode: '',
      state: '',
      dealCount: 0,
      dealTotal: 0
    };
    setCurrent(emptyCompany);
  };

  const handleLocalFilter = (id: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setFilterList({
      ...filterList,
      [id]: value
    });
  };

  const createSortHandler = (property: string) => () => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleCancel = () => {
    setCurrent(undefined);
  };

  const handleUpdateTable = () => {
    dispatch(getCompanies(filter));
    setCurrent(undefined);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Toolbar>
          <TextField
            name="name"
            label="Filter by name..."
            variant="outlined"
            size="small"
            type="search"
            onChange={handleFilter}
          />
          <Button className={classes.addButton} onClick={handleAddClick}>
            Add company
          </Button>
        </Toolbar>
      </Grid>

      <Grid item className={classes.table} md={current ? 8 : 12}>
        <TableContainer className={classes.tableContainer}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={
                      headCell.id === 'name' || headCell.id === 'country'
                        ? 'left'
                        : 'right'
                    }
                    className={classes.headerColumn}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={createSortHandler(headCell.id)}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <span className={classes.visuallyHidden}>
                          {order === 'desc'
                            ? 'sorted descending'
                            : 'sorted ascending'}
                        </span>
                      ) : null}
                    </TableSortLabel>
                    <TextField
                      name={headCell.id}
                      variant="outlined"
                      size="small"
                      type="search"
                      value={filterList[headCell.id]}
                      onChange={handleLocalFilter(headCell.id)}
                      style={{ display: 'block' }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(newCompanies, order, orderBy).map(
                (company: Company) => (
                  <TableRow
                    key={company.id}
                    hover
                    selected={company.id === current?.id}
                    onClick={handleTableRowClick(company)}
                  >
                    <TableCell align="left">{company.name}</TableCell>
                    <TableCell align="left">{company.country}</TableCell>
                    <TableCell align="right">{company.dealCount}</TableCell>
                    <TableCell align="right">
                      $
                      {getDealPrice(company.dealTotal).replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ','
                      )}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item md={4}>
        {current && (
          <EditCompany
            company={current}
            countries={countries}
            handleCancel={handleCancel}
            updateTable={handleUpdateTable}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Companies;
