import React, { useState } from 'react';
import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';

interface AdminLayoutProps {
  children?: ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    // marginLeft: 0,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 256
    }
  },
  wrapperShift: {
    [theme.breakpoints.up('md')]: {
      marginLeft: '-256px'
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState<boolean>(true);

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(!isMobileNavOpen)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div
        className={clsx(
          classes.wrapper,
          !isMobileNavOpen && classes.wrapperShift
        )}
      >
        <div className={classes.contentContainer}>
          <div className={classes.content}>{children}</div>
        </div>
      </div>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node
};

export default AdminLayout;
