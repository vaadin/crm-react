import React from 'react';
import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Hidden,
  Drawer,
  makeStyles,
  Box,
  Link,
  ListItem,
  Divider
} from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  tutorialButton: {
    borderRadius: 8,
    marginTop: 24,
    marginLeft: 16,
    width: 224,
    backgroundColor: '#1676f3',
    color: 'white',
    fontWeight: 'bold'
  },
  tutorialTitle: {
    paddingRight: 64
  }
}));

interface NavBarProps {
  onMobileClose: () => void;
  openMobile: boolean;
}

const NavBar: FC<NavBarProps> = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();

  const content = (
    <>
      <Box ml={2} mt={2} mb={2}>
        <Link
          component={RouterLink}
          to="/contacts"
          underline="none"
        >
          <ListItem>List</ListItem>
        </Link>
        <Link
          component={RouterLink}
          to="/dashboard"
          underline="none"
        >
          <ListItem>Dashboard</ListItem>
        </Link>
      </Box>
      <Divider />
      <Link
        href="https://vaadin.com/learn/tutorials/modern-web-apps-with-spring-boot-and-vaadin"
        target="_blank"
        underline="none"
      >
        <ListItem className={classes.tutorialButton}>
          <span className={classes.tutorialTitle}>Read Tutorial</span>
          <OpenInNewIcon />
        </ListItem>
      </Link>
    </>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          <div>{content}</div>
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="persistent"
        >
          <div>{content}</div>
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func.isRequired,
  openMobile: PropTypes.bool.isRequired
};

export default NavBar;