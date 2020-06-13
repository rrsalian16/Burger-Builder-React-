import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItem from '../NavigationItems/NavigationItems';
import DrawerToggel from '../SideDrawer/DrawerToggerl/DrawerToggel'

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggel clicked={props.drawerToggelClicked} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItem isAuthenticated={props.isAuth}/>
    </nav>
  </header>
);

export default toolbar;