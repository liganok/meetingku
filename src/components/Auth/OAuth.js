import React from 'react'
import agent from '../../agent'
import { connect } from 'react-redux'

import Button from 'material-ui/Button'
import * as types from '../../constants/actionTypes'
import { getOAuthURL } from '../../utils/oAuth'

const mapStateToProps = state => ({ ...state.common })

const mapDispatchToProps = dispatch => ({
  onOAuthRegister: (oauth_name, oauth_access_token, oauth_expires) => {
    const payload = agent.Auth.oAuthRegister(oauth_name, oauth_access_token, oauth_expires)
    dispatch({ type: types.REGISTER, payload }
    )},
  onRedirect: (value = null) => dispatch({ type: types.REDIRECT, value: value })
})

class OAuth extends React.Component {
  componentWillMount() {
    console.log('--------------', window.location.hash.substring(1), 'hello', this.props.match.params.name)
    let queryString = window.location.hash.substring(1)
    if(queryString){
      let params = {};
      let regex = /([^&=]+)=([^&]*)/g, m;
      while (m = regex.exec(queryString)) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
      }
      console.log('*************', params)
      let oauth_name = this.props.match.params.name
      let oauth_access_token = params['access_token']
      let oauth_expires = params['expires_in']
      this.props.onOAuthRegister(oauth_name, oauth_access_token, oauth_expires)
    }
  }

  render() {
    return (
      <div>
        <a href={getOAuthURL('google')}>
          <Button raised color="primary" >Log In</Button>
        </a>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OAuth)
