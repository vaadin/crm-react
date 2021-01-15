import React from 'react';
import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
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
  },
  linkStyle: {
    textDecoration: 'none'
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
        <NavLink
          to="/contacts"
          className={classes.linkStyle}
          activeStyle={{ color: 'blue', fontWeight: 'bold' }}
        >
          <ListItem>Contacts</ListItem>
        </NavLink>
        <NavLink
          to="/companies"
          className={classes.linkStyle}
          activeStyle={{ color: 'blue', fontWeight: 'bold' }}
        >
          <ListItem>Companies</ListItem>
        </NavLink>
        <NavLink
          to="/deals"
          className={classes.linkStyle}
          activeStyle={{ color: 'blue', fontWeight: 'bold' }}
        >
          <ListItem>Deals</ListItem>
        </NavLink>
        <NavLink
          to="/dashboard"
          className={classes.linkStyle}
          activeStyle={{ color: 'blue', fontWeight: 'bold' }}
        >
          <ListItem>Dashboard</ListItem>
        </NavLink>
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
      <Hidden mdUp>
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
      <Hidden smDown>
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
