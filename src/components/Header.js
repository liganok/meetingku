import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';


/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
const Header = () => (
  <AppBar
    title="Test"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
    iconElementRight={<FlatButton label="Sign In" />}
  />
);

export default Header;