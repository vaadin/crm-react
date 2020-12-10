import React from 'react';
import type { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Snackbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MuiAlert from '@material-ui/lab/Alert';
import useAuth from '../../../hooks/useAuth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
);

interface TopBarProps {
  className?: string;
  onMobileNavOpen?: () => void;
}

const TopBar: FC<TopBarProps> = ({ className, onMobileNavOpen }) => {
  const classes = useStyles();
  const history = useHistory();
  const { logout } = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      history.push('/');
    } catch (err) {
      console.log(err);
      setOpen(true);
    }
  };

  return (
    <AppBar className={clsx(classes.root, className)}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={onMobileNavOpen}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Vaadin CRM
        </Typography>
        <Button color="inherit" onClick={handleLogout}>Log out</Button>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error">
            Something went wrong! Please try again later
          </MuiAlert>
        </Snackbar>

      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

TopBar.defaultProps = {
  onMobileNavOpen: () => {}
};

export default TopBar;
