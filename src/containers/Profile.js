import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  LOGOUT
} from '../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: LOGOUT })
});

const Profile = () => (
  <div>
    <button
      className="btn btn-outline-danger"
      onClick={this.props.onClickLogout}>
      Or click here to logout.
    </button>
  </div>
);

export default Profile;