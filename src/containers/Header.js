import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class Header extends React.Component{
  constructor() {
    super();
    this.state={open:false}
  }

  handleToggle = () => {
    this.setState({open: !this.state.open})
  };

  render() {
    return (
      <div>
        <AppBar
          title="Test"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={300}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <AppBar
            title="Test"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            onLeftIconButtonTouchTap={this.handleToggle}
          />
          <MenuItem onTouchTap={this.handleToggle}>Menu Item</MenuItem>
          <MenuItem onTouchTap={this.handleToggle}>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default Header;